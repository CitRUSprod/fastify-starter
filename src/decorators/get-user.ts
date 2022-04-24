import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { BadRequest } from "http-errors"
import { User } from "@prisma/client"

declare module "fastify" {
    interface FastifyInstance {
        getUser(id: number): Promise<User>
    }
}

export const getUser: FastifyPluginCallback = (app, options, done) => {
    app.decorate<FastifyInstance["getUser"]>("getUser", async (id: number) => {
        const user = await app.prisma.user.findFirst({ where: { id } })
        if (!user) throw new BadRequest("User with such ID was not found")

        return user
    })

    done()
}
