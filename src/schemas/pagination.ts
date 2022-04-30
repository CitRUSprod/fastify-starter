import { Type } from "@sinclair/typebox"

export function pagination() {
    const schema = Type.Object({
        page: Type.Optional(Type.Integer({ minimum: 1 })),
        perPage: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 }))
    })
    return schema.properties
}
