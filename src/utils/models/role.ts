import { Role } from "@prisma/client"
import { JsonObject } from "type-fest"

export function dto(role: Role): JsonObject {
    return {
        id: role.id,
        name: role.name,
        permissions: role.permissions
    }
}
