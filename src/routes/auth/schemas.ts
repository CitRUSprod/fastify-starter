import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

export const registerBody = Type.Strict(
    Type.Object(
        {
            email: schemas.user.email(),
            username: schemas.user.username(),
            password: schemas.user.password()
        },
        { additionalProperties: false }
    )
)

export type RegisterBody = Static<typeof registerBody>

export const loginBody = Type.Strict(
    Type.Object(
        {
            email: schemas.user.email(),
            password: schemas.user.password()
        },
        { additionalProperties: false }
    )
)

export type LoginBody = Static<typeof loginBody>
