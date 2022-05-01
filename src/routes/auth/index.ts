import { FastifyPluginCallback } from "fastify"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const authRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: schemas.RegisterBody }>("/register", {
        schema: {
            tags: ["auth"],
            body: schemas.registerBody
        },
        async handler(req, reply) {
            const data = await handlers.register(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: schemas.LoginBody }>("/login", {
        schema: {
            tags: ["auth"],
            body: schemas.loginBody
        },
        async handler(req, reply) {
            const data = await handlers.login(app, { body: req.body })
            await reply.sendData(data)
        }
    })

    app.get("/me", {
        schema: {
            tags: ["auth"]
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const data = await handlers.getMe(app, { payload: req.user })
            await reply.sendData(data)
        }
    })

    app.post("/logout", {
        schema: {
            tags: ["auth"]
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const data = await handlers.logout(app, { cookies: req.cookies })
            await reply.sendData(data)
        }
    })

    app.post("/refresh", {
        schema: {
            tags: ["auth"]
        },
        async handler(req, reply) {
            const data = await handlers.refresh(app, { cookies: req.cookies })
            await reply.sendData(data)
        }
    })

    done()
}
