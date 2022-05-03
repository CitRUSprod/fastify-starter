/* eslint-disable @typescript-eslint/naming-convention */

import { Type } from "@sinclair/typebox"

export const env = Type.Strict(
    Type.Object(
        {
            JWT_SECRET: Type.String(),
            ENABLE_DOCS: Type.Boolean(),
            MAILER_HOST: Type.String(),
            MAILER_PORT: Type.Integer(),
            MAILER_USERNAME: Type.String(),
            MAILER_PASSWORD: Type.String(),
            MAILER_NAME: Type.String(),
            EMAIL_CONFIRMATION_URL: Type.String(),
            PASSWORD_RESET_URL: Type.String()
        },
        { additionalProperties: false }
    )
)
