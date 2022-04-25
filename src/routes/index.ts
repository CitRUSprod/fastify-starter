import { FastifyPluginCallback } from "fastify"
import { authRoute } from "./auth"
import { usersRoute } from "./users"
import { postsRoute } from "./posts"

export const routes: FastifyPluginCallback = (app, options, done) => {
    app.register(authRoute, { prefix: "/auth" })
    app.register(usersRoute, { prefix: "/users" })
    app.register(postsRoute, { prefix: "/posts" })

    done()
}
