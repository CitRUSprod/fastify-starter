import { FastifyInstance } from "fastify"
import { BadRequest, Unauthorized, InternalServerError } from "http-errors"
import argon2 from "argon2"
import { TokenTtl } from "$/enums"
import { Payload } from "$/types"
import * as Types from "./types"

interface PayloadWithExtra extends Payload {
    iat: string
    exp: string
}

function generateTokens(app: FastifyInstance, payload: Payload) {
    const access = app.jwt.sign(payload, { expiresIn: TokenTtl.Access })
    const refresh = app.jwt.sign(payload, { expiresIn: TokenTtl.Refresh })
    return { access, refresh }
}

function getPayload(app: FastifyInstance, token: string): [Payload, null] | [null, Error] {
    try {
        const { iat, exp, ...payload } = app.jwt.verify<PayloadWithExtra>(token)
        return [payload, null]
    } catch (err: any) {
        return [null, err]
    }
}

export async function register(app: FastifyInstance, body: Types.RegisterBody) {
    const userByEmail = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (userByEmail) throw new BadRequest("User with such email already exists")

    const userByUsername = await app.prisma.user.findFirst({ where: { username: body.username } })
    if (userByUsername) throw new BadRequest("User with such username already exists")

    const password = await argon2.hash(body.password)
    const user = app.prisma.user.create({
        data: { email: body.email, username: body.username, password }
    })

    return user
}

export async function login(app: FastifyInstance, body: Types.LoginBody) {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequest("User with such email was not found")

    const isCorrectPassword = await argon2.verify(user.password, body.password)
    if (!isCorrectPassword) throw new BadRequest("Incorrect password")

    const tokens = generateTokens(app, { id: user.id })
    await app.prisma.refreshToken.create({
        data: { token: tokens.refresh, userId: user.id }
    })

    return tokens
}

export async function getMe(app: FastifyInstance, payload: Payload) {
    const user = await app.prisma.user.findFirst({ where: { id: payload.id } })
    if (!user) throw new InternalServerError("User not found")

    return user
}

export async function logout(app: FastifyInstance, cookies: Types.LogoutCookies) {
    if (!cookies.refreshToken) throw new Unauthorized("Refresh token is not defined")

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })
    if (!refreshToken) throw new Unauthorized("Refresh token expired")

    await app.prisma.refreshToken.delete({ where: { id: refreshToken.id } })
}

export async function refresh(app: FastifyInstance, cookies: Types.RefreshCookies) {
    if (!cookies.refreshToken) throw new Unauthorized("Refresh token is not defined")

    const [payload, err] = getPayload(app, cookies.refreshToken)

    if (err) {
        switch (err.name) {
            case "TokenExpiredError": {
                throw new Unauthorized("Refresh token expired")
            }

            case "JsonWebTokenError": {
                throw new Unauthorized("Refresh token is invalid")
            }
        }

        throw new InternalServerError(`Unexpected error: ${err.message}`)
    }

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })
    if (!refreshToken) throw new Unauthorized("Refresh token expired")

    const tokens = generateTokens(app, payload)
    await app.prisma.refreshToken.update({
        where: { id: refreshToken.id },
        data: { token: tokens.refresh }
    })

    return tokens
}
