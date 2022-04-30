import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const getUsersQuery = Type.Strict(
    Type.Object(
        {
            ...schemas.pagination().properties,
            ...schemas.sorting("email", "username", "registrationDate").properties,
            email: Type.Optional(schemas.user.email()),
            username: Type.Optional(schemas.user.username())
        },
        { additionalProperties: false }
    )
)

export type GetUsersQuery = Static<typeof getUsersQuery>

export const getUserParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type GetUserParams = Static<typeof getUserParams>

export const updateUserParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type UpdateUserParams = Static<typeof updateUserParams>

export const updateUserBody = Type.Strict(
    Type.Object(
        {
            email: Type.Optional(schemas.user.email()),
            username: Type.Optional(schemas.user.username())
        },
        { additionalProperties: false }
    )
)

export type UpdateUserBody = Static<typeof updateUserBody>
