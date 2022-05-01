import { FastifyPluginCallback } from "fastify"
import { Role } from "@prisma/client"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const usersRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: schemas.GetUsersQuery }>("/", {
        schema: {
            tags: ["users"],
            querystring: schemas.getUsersQuery
        },
        preHandler: app.auth([app.isAuthorized, app.hasAccess(Role.Admin)], { relation: "and" }),
        async handler(req, reply) {
            const data = await handlers.getUsers(app, { query: req.query })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: schemas.GetUserParams }>("/:id", {
        schema: {
            tags: ["users"],
            params: schemas.getUserParams
        },
        async handler(req, reply) {
            const data = await handlers.getUser(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.patch<{ Params: schemas.UpdateUserParams; Body: schemas.UpdateUserBody }>("/:id", {
        schema: {
            tags: ["users"],
            params: schemas.updateUserParams,
            body: schemas.updateUserBody
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const data = await handlers.updateUser(app, {
                payload: req.user,
                params: req.params,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    done()
}
