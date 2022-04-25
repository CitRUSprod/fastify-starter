import { FastifyPluginCallback } from "fastify"
import { Role } from "@prisma/client"
import * as schemas from "./schemas"
import * as handlers from "./handlers"
import * as Types from "./types"

export const usersRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: Types.GetUsersQuery }>("/", {
        schema: {
            tags: ["users"],
            querystring: schemas.getUsersQuery
        },
        preHandler: app.auth([app.isAuthorized, app.hasAccess(Role.Admin)], { relation: "and" }),
        async handler(req) {
            return handlers.getUsers(app, req.query)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: Types.GetUserParams }>("/:id", {
        schema: {
            tags: ["users"],
            params: schemas.getUserParams
        },
        async handler(req) {
            return handlers.getUser(app, req.params)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.patch<{ Params: Types.UpdateUserParams; Body: Types.UpdateUserBody }>("/:id", {
        schema: {
            tags: ["users"],
            params: schemas.updateUserParams,
            body: schemas.updateUserBody
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req) {
            return handlers.updateUser(app, req.user, req.params, req.body)
        }
    })

    done()
}
