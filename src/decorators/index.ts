import { FastifyPluginCallback } from "fastify"
import fp from "fastify-plugin"
import { prisma } from "./prisma"
import { isAuthorized } from "./is-authorized"
import { hasAccess } from "./has-access"
import { getUser } from "./get-user"

function changeScope(fn: FastifyPluginCallback) {
    return fp(fn)
}

export const decorators = changeScope((app, options, done) => {
    app.register(changeScope(prisma))
        .register(changeScope(isAuthorized))
        .register(changeScope(hasAccess))
        .register(changeScope(getUser))

    done()
})
