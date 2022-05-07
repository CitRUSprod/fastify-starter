import { FastifyPluginCallback } from "fastify"
import * as handlers from "./handlers"

export const permissionsRoutes: FastifyPluginCallback = (app, options, done) => {
    app.get("/", {
        schema: {
            tags: ["permissions"]
        },
        async handler(req, reply) {
            const data = await handlers.getPermissions(app, {})
            await reply.sendData(data)
        }
    })

    done()
}
