import { FastifyPluginCallback } from "fastify"
import { authRoute } from "./auth"
import { postsRoute } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(authRoute, { prefix: "/auth" })
    app.register(postsRoute, { prefix: "/posts" })

    done()
}
