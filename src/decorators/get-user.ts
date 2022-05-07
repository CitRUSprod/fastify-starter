import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import { User, Role } from "@prisma/client"

declare module "fastify" {
    interface FastifyInstance {
        getUser(id: number): Promise<User & { role: Role }>
    }
}

export const getUser: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["getUser"]>("getUser", async id => {
        const user = await app.prisma.user.findFirst({ where: { id }, include: { role: true } })
        if (!user) throw new BadRequest("User with such ID was not found")
        return user
    })

    done()
}
