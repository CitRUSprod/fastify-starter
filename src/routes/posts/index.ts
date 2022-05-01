import { FastifyPluginCallback } from "fastify"
import * as schemas from "./schemas"
import * as handlers from "./handlers"

export const postsRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: schemas.GetPostsQuery }>("/", {
        schema: {
            tags: ["posts"],
            querystring: schemas.getPostsQuery
        },
        async handler(req, reply) {
            const data = await handlers.getPosts(app, { query: req.query })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: schemas.CreatePostBody }>("/", {
        schema: {
            tags: ["posts"],
            body: schemas.createPostBody
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const data = await handlers.createPost(app, { payload: req.user, body: req.body })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: schemas.GetPostParams }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.getPostParams
        },
        async handler(req, reply) {
            const data = await handlers.getPost(app, { params: req.params })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.patch<{ Params: schemas.UpdatePostParams; Body: schemas.UpdatePostBody }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.updatePostParams,
            body: schemas.updatePostBody
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const data = await handlers.updatePost(app, {
                payload: req.user,
                params: req.params,
                body: req.body
            })
            await reply.sendData(data)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.delete<{ Params: schemas.DeletePostParams }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.deletePostParams
        },
        preHandler: app.auth([app.isAuthorized]),
        async handler(req, reply) {
            const data = await handlers.deletePost(app, { payload: req.user, params: req.params })
            await reply.sendData(data)
        }
    })

    done()
}
