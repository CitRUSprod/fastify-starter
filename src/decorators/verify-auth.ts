import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "@fastify/auth"
import { UserPayload } from "$/types"

declare module "fastify" {
    interface FastifyInstance {
        verifyAuth: FastifyAuthFunction
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: UserPayload
    }
}

export const verifyAuth: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["verifyAuth"]>("verifyAuth", req => req.jwtVerify())

    done()
}
