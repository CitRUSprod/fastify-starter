import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

const title = Type.String({ minLength: 1, maxLength: 64, transform: ["trim"] })
const content = Type.String({ minLength: 1, transform: ["trim"] })

export const getPostsQuery = Type.Strict(
    Type.Object(
        {
            ...schemas.pagination(),
            ...schemas.sorting("title", "creationDate"),
            title: Type.Optional(title)
        },
        { additionalProperties: false }
    )
)

export type GetPostsQuery = Static<typeof getPostsQuery>

export const createPostBody = Type.Strict(
    Type.Object(
        {
            title,
            content
        },
        { additionalProperties: false }
    )
)

export type CreatePostBody = Static<typeof createPostBody>

export const getPostParams = Type.Strict(
    Type.Object(
        {
            ...schemas.id()
        },
        { additionalProperties: false }
    )
)

export type GetPostParams = Static<typeof getPostParams>

export const updatePostParams = Type.Strict(
    Type.Object(
        {
            ...schemas.id()
        },
        { additionalProperties: false }
    )
)

export type UpdatePostParams = Static<typeof updatePostParams>

export const updatePostBody = Type.Strict(
    Type.Object(
        {
            title: Type.Optional(title),
            content: Type.Optional(content)
        },
        { additionalProperties: false }
    )
)

export type UpdatePostBody = Static<typeof updatePostBody>

export const deletePostParams = Type.Strict(
    Type.Object(
        {
            ...schemas.id()
        },
        { additionalProperties: false }
    )
)

export type DeletePostParams = Static<typeof deletePostParams>
