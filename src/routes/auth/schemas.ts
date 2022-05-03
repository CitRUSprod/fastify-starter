import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

function refreshToken() {
    return Type.String()
}

function emailConfirmationToken() {
    return Type.String()
}

function passwordResetToken() {
    return Type.String()
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

export const confirmEmailParams = Type.Strict(
    Type.Object(
        {
            emailConfirmationToken: emailConfirmationToken()
        },
        { additionalProperties: false }
    )
)

export type ConfirmEmailParams = Static<typeof confirmEmailParams>

export const changePasswordBody = Type.Strict(
    Type.Object(
        {
            oldPassword: schemas.user.password(),
            newPassword: schemas.user.password()
        },
        { additionalProperties: false }
    )
)

export type ChangePasswordBody = Static<typeof changePasswordBody>

export const sendPasswordResetEmailBody = Type.Strict(
    Type.Object(
        {
            email: schemas.user.email()
        },
        { additionalProperties: false }
    )
)

export type SendPasswordResetEmailBody = Static<typeof sendPasswordResetEmailBody>

export const resetPasswordParams = Type.Strict(
    Type.Object(
        {
            passwordResetToken: passwordResetToken()
        },
        { additionalProperties: false }
    )
)

export type ResetPasswordParams = Static<typeof resetPasswordParams>

export const resetPasswordBody = Type.Strict(
    Type.Object(
        {
            newPassword: schemas.user.password()
        },
        { additionalProperties: false }
    )
)

export type ResetPasswordBody = Static<typeof resetPasswordBody>
