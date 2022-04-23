import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { FastifyAuthFunction } from "fastify-auth"
import { MethodNotAllowed } from "http-errors"
import { Role } from "@prisma/client"
import { hasAccess as utilHasAccess } from "$/utils"

declare module "fastify" {
    interface FastifyInstance {
        hasAccess(...allowedRoles: Array<Role>): FastifyAuthFunction
    }
}

export const hasAccess: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["hasAccess"]>(
        "hasAccess",
        (...allowedRoles) =>
            async (req, reply, next) => {
                const noAccessError = new MethodNotAllowed("No access")

                const { id } = req.user
                const user = await app.prisma.user.findFirst({ where: { id } })

                if (!user) {
                    next(noAccessError)
                    return
                }

                const allowed = utilHasAccess(user, allowedRoles)
                next(allowed ? undefined : noAccessError)
            }
    )

    done()
}
