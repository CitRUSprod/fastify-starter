import { FastifyPluginCallback } from "fastify"
import fp from "fastify-plugin"
import { prisma } from "./prisma"
import { getUser } from "./get-user"
import { sendData } from "./send-data"
import { verifyAuth } from "./verify-auth"
import { verifyPermission } from "./verify-permission"

function changeScope(fn: FastifyPluginCallback) {
    return fp(fn)
}

export const decorators = changeScope((app, options, done) => {
    app.register(changeScope(prisma))
        .register(changeScope(getUser))
        .register(changeScope(sendData))
        .register(changeScope(verifyAuth))
        .register(changeScope(verifyPermission))

    done()
})
