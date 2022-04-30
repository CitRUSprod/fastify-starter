import { Type, TValue } from "@sinclair/typebox"

export function sorting<T extends TValue>(field: T, ...fields: Array<T>) {
    const schema = Type.Object({
        sort: Type.Optional(
            Type.Union([Type.Literal(field), ...fields.map(f => Type.Literal(f))], {
                transform: ["trim"]
            })
        ),
        order: Type.Optional(
            Type.Union([Type.Literal("asc"), Type.Literal("desc")], {
                transform: ["trim", "toLowerCase"]
            })
        )
    })
    return schema.properties
}