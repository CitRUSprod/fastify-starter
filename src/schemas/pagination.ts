import { Type } from "@sinclair/typebox"

export function pagination() {
    return Type.Object(
        {
            page: Type.Optional(Type.Integer({ minimum: 1 })),
            perPage: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 }))
        },
        { additionalProperties: false }
    )
}
