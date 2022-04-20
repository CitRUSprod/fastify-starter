import { FastifyPluginCallback } from "fastify"
import * as schemas from "./schemas"
import * as handlers from "./handlers"
import * as Types from "./types"

export const postsRoute: FastifyPluginCallback = (app, options, done) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Querystring: Types.GetPostsQuery }>("/", {
        schema: {
            querystring: schemas.getPostsQuery
        },
        handler(req) {
            return handlers.getPosts(app, req.query)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.post<{ Body: Types.CreatePostBody }>("/", {
        schema: {
            body: schemas.createPostBody
        },
        handler(req) {
            return handlers.createPost(app, req.body)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.get<{ Params: Types.GetPostParams }>("/:id", {
        schema: {
            params: schemas.getPostParams
        },
        handler(req) {
            return handlers.getPost(app, req.params)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.patch<{ Params: Types.UpdatePostParams; Body: Types.UpdatePostBody }>("/:id", {
        schema: {
            params: schemas.updatePostParams,
            body: schemas.updatePostBody
        },
        handler(req) {
            return handlers.updatePost(app, req.params, req.body)
        }
    })

    // eslint-disable-next-line @typescript-eslint/naming-convention
    app.delete<{ Params: Types.DeletePostParams }>("/:id", {
        schema: {
            params: schemas.deletePostParams
        },
        handler(req) {
            return handlers.deletePost(app, req.params)
        }
    })

    done()
}
