import { dtos } from "$/utils"
import { RouteHandler } from "$/types"
import * as schemas from "./schemas"

export const getRoles: RouteHandler = async app => {
    const roles = await app.prisma.role.findMany()
    return { payload: { items: roles.map(r => dtos.role(r)) } }
}

export const createRole: RouteHandler<{ body: schemas.CreateRoleBody }> = async (app, { body }) => {
    const role = await app.prisma.role.create({ data: body })
    return { payload: dtos.role(role) }
}

export const updateRole: RouteHandler<{
    params: schemas.UpdateRoleParams
    body: schemas.UpdateRoleBody
}> = async (app, { params, body }) => {
    const role = await app.prisma.role.update({ where: { id: params.id }, data: body })
    return { payload: dtos.role(role) }
}

export const deleteRole: RouteHandler<{ params: schemas.UpdateRoleParams }> = async (
    app,
    { params }
) => {
    const role = await app.prisma.role.delete({ where: { id: params.id } })
    return { payload: dtos.role(role) }
}