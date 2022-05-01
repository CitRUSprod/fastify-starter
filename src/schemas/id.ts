import { Type } from "@sinclair/typebox"

export function id() {
    return Type.Strict(Type.Integer({ minimum: 1 }))
}
