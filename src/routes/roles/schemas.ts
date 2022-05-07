import { Permission } from "@prisma/client"
import { Type, Static } from "@sinclair/typebox"
import * as schemas from "$/schemas"

function name() {
    return Type.String()
}

function permissions() {
    return Type.Array(Type.Enum(Permission))
}

export const createRoleBody = Type.Strict(
    Type.Object(
        {
            name: name(),
            permissions: permissions()
        },
        { additionalProperties: false }
    )
)

export type CreateRoleBody = Static<typeof createRoleBody>

export const updateRoleParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type UpdateRoleParams = Static<typeof updateRoleParams>

export const updateRoleBody = Type.Strict(
    Type.Object(
        {
            name: Type.Optional(name()),
            permissions: Type.Optional(permissions())
        },
        { additionalProperties: false }
    )
)

export type UpdateRoleBody = Static<typeof updateRoleBody>

export const deleteRoleParams = Type.Strict(
    Type.Object(
        {
            id: schemas.id()
        },
        { additionalProperties: false }
    )
)

export type DeleteRoleParams = Static<typeof deleteRoleParams>
