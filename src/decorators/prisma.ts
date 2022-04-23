import { FastifyInstance, FastifyPluginCallback } from "fastify"
import { PrismaClient } from "@prisma/client"

declare module "fastify" {
    interface FastifyInstance {
        prisma: PrismaClient
    }
}

export const prisma: FastifyPluginCallback = (app, options, done) => {
    const client = new PrismaClient()

    client.$connect().then(() => {
        app.decorate<FastifyInstance["prisma"]>("prisma", client)

        done()
    })
}
