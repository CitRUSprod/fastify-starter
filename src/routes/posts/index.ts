import { FastifyPluginCallback } from "fastify"
import * as schemas from "./schemas"
import * as handlers from "./handlers"
import * as Types from "./types"

export const postsRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: Types.GetPostsQuery }>("/", {
        schema: {
            tags: ["posts"],
            querystring: schemas.getPostsQuery
        },
        async handler(req) {
            return handlers.getPosts(app, req.query)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: Types.CreatePostBody }>("/", {
        schema: {
            tags: ["posts"],
            body: schemas.createPostBody
        },
        async handler(req) {
            return handlers.createPost(app, req.body)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: Types.GetPostParams }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.getPostParams
        },
        async handler(req) {
            return handlers.getPost(app, req.params)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.patch<{ Params: Types.UpdatePostParams; Body: Types.UpdatePostBody }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.updatePostParams,
            body: schemas.updatePostBody
        },
        async handler(req) {
            return handlers.updatePost(app, req.params, req.body)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.delete<{ Params: Types.DeletePostParams }>("/:id", {
        schema: {
            tags: ["posts"],
            params: schemas.deletePostParams
        },
        async handler(req) {
            return handlers.deletePost(app, req.params)
        }
    })

    done()
}
