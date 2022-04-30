import { Type } from "@sinclair/typebox"

export function id() {
    const schema = Type.Object({
        id: Type.Integer({ minimum: 1 })
    })
    return schema.properties
}
