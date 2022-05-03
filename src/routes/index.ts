import { FastifyPluginCallback } from "fastify"
import { authRoutes } from "./auth"
import { usersRoutes } from "./users"
import { postsRoutes } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(authRoutes, { prefix: "/auth" })
    app.register(usersRoutes, { prefix: "/users" })
    app.register(postsRoutes, { prefix: "/posts" })

    done()
}
