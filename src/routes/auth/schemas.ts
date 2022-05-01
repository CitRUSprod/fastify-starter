import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

function refreshToken() {
    return Type.Optional(Type.String())
}

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

export const logoutCookies = Type.Strict(
    Type.Object(
        {
            refreshToken: refreshToken()
        },
        { additionalProperties: false }
    )
)

export type LogoutCookies = Static<typeof logoutCookies>

export const refreshCookies = Type.Strict(
    Type.Object(
        {
            refreshToken: refreshToken()
        },
        { additionalProperties: false }
    )
)

export type RefreshCookies = Static<typeof refreshCookies>
