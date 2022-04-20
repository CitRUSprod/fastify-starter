import { FastifyPluginCallback } from "fastify"
import { postsRoute } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(postsRoute, { prefix: "/posts" })

    done()
}
