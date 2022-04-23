import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "fastify-auth"

declare module "fastify" {
    interface FastifyInstance {
        isAuthorized: FastifyAuthFunction
    }
}

export const isAuthorized: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["isAuthorized"]>("isAuthorized", req => req.jwtVerify())
    done()
}
