import { FastifyInstance } from "fastify"
import { BadRequest, Unauthorized, InternalServerError } from "http-errors"
import argon2 from "argon2"
import { Payload } from "$/types"
import * as Types from "./types"
import * as utils from "./utils"

export async function register(app: FastifyInstance, body: Types.RegisterBody) {
    const userByEmail = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (userByEmail) throw new BadRequest("User with such email already exists")

    const userByUsername = await app.prisma.user.findFirst({ where: { username: body.username } })
    if (userByUsername) throw new BadRequest("User with such username already exists")

    const password = await argon2.hash(body.password)
    const user = app.prisma.user.create({
        data: { email: body.email, username: body.username, password, registrationDate: new Date() }
    })

    return user
}

export async function login(app: FastifyInstance, body: Types.LoginBody) {
    const user = await app.prisma.user.findFirst({ where: { email: body.email } })
    if (!user) throw new BadRequest("User with such email was not found")

    const isCorrectPassword = await argon2.verify(user.password, body.password)
    if (!isCorrectPassword) throw new BadRequest("Incorrect password")

    await utils.deleteExpiredRefreshTokens(app)

    const tokens = utils.generateTokens(app, { id: user.id })
    await app.prisma.refreshToken.create({
        data: { token: tokens.refresh, userId: user.id, creationDate: new Date() }
    })

    return tokens
}

export async function getMe(app: FastifyInstance, payload: Payload) {
    const user = await app.getUser(payload.id)
    return user
}

export async function logout(app: FastifyInstance, cookies: Types.LogoutCookies) {
    if (!cookies.refreshToken) throw new Unauthorized("Refresh token is not defined")

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })

    if (!refreshToken) {
        utils.getPayload(app, cookies.refreshToken)
        throw new InternalServerError("Unexpected error")
    }

    await app.prisma.refreshToken.delete({ where: { id: refreshToken.id } })
}

export async function refresh(app: FastifyInstance, cookies: Types.RefreshCookies) {
    if (!cookies.refreshToken) throw new Unauthorized("Refresh token is not defined")

    const payload = utils.getPayload(app, cookies.refreshToken)

    const refreshToken = await app.prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken }
    })
    if (!refreshToken) throw new InternalServerError("Refresh token not found")

    const tokens = utils.generateTokens(app, payload)
    await app.prisma.refreshToken.update({
        where: { id: refreshToken.id },
        data: { token: tokens.refresh, creationDate: new Date() }
    })

    return tokens
}
