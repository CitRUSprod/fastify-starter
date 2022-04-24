import { FastifyInstance } from "fastify"
import { Unauthorized } from "http-errors"
import { TokenTtl } from "$/enums"
import { Payload } from "$/types"

interface PayloadWithTimestamps extends Payload {
    iat: string
    exp: string
}

export function generateTokens(app: FastifyInstance, payload: Payload) {
    const access = app.jwt.sign(payload, { expiresIn: TokenTtl.Access })
    const refresh = app.jwt.sign(payload, { expiresIn: TokenTtl.Refresh })
    return { access, refresh }
}

export function getPayload(app: FastifyInstance, token: string): Payload {
    try {
        const { iat, exp, ...payload } = app.jwt.verify<PayloadWithTimestamps>(token)
        return payload
    } catch (err: any) {
        throw new Unauthorized(err.message)
    }
}

export async function deleteExpiredRefreshTokens(app: FastifyInstance) {
    await app.prisma.refreshToken.deleteMany({
        where: { creationDate: { lt: new Date(Date.now() - TokenTtl.Refresh * 1000) } }
    })
}
