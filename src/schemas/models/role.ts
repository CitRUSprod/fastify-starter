import { Permission } from "@prisma/client"
import { Type } from "@sinclair/typebox"

export function name() {
    return Type.String()
}

export function permissions() {
    return Type.Array(Type.Enum(Permission))
}
