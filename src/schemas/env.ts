import { Type } from "@sinclair/typebox"

export const env = Type.Strict(
    Type.Object(
        {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            JWT_SECRET: Type.String(),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ENABLE_DOCS: Type.Boolean()
        },
        { additionalProperties: false }
    )
)
