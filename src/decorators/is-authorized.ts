import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "fastify-auth"
import { Payload } from "$/types"

declare module "fastify" {
    interface FastifyInstance {
        isAuthorized: FastifyAuthFunction
    }
}

declare module "fastify-jwt" {
    interface FastifyJWT {
        payload: Payload
    }
}

export const isAuthorized: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["isAuthorized"]>("isAuthorized", req => req.jwtVerify())
    done()
}
