import { FastifyPluginCallback } from "fastify"
import { TokenTtl } from "$/enums"
import * as schemas from "./schemas"
import * as handlers from "./handlers"
import * as Types from "./types"

export const authRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: Types.RegisterBody }>("/register", {
        schema: {
            tags: ["auth"],
            body: schemas.registerBody
        },
        async handler(req) {
            return handlers.register(app, req.body)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: Types.LoginBody }>("/login", {
        schema: {
            tags: ["auth"],
            body: schemas.loginBody
        },
        async handler(req, reply) {
            const tokens = await handlers.login(app, req.body)
            reply
                .setCookie("accessToken", tokens.access, {
                    path: "/",
                    maxAge: TokenTtl.Access
                })
                .setCookie("refreshToken", tokens.refresh, {
                    path: "/",
                    maxAge: TokenTtl.Refresh,
                    httpOnly: true
                })
                .send()
        }
    })

    app.get("/me", {
        schema: {
            tags: ["auth"]
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req) {
            return handlers.getMe(app, req.user)
        }
    })

    app.post("/logout", {
        schema: {
            tags: ["auth"]
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            await handlers.logout(app, req.cookies)
            reply.clearCookie("accessToken").clearCookie("refreshToken").send()
        }
    })

    app.post("/refresh", {
        schema: {
            tags: ["auth"]
        },
        async handler(req, reply) {
            const tokens = await handlers.refresh(app, req.cookies)
            reply
                .setCookie("accessToken", tokens.access, {
                    path: "/",
                    maxAge: TokenTtl.Access
                })
                .setCookie("refreshToken", tokens.refresh, {
                    path: "/",
                    maxAge: TokenTtl.Refresh,
                    httpOnly: true
                })
                .send()
        }
    })

    done()
}
