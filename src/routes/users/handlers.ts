import { MethodNotAllowed } from "http-errors"
import { Prisma } from "@prisma/client"
import { dtos, getItemsPage } from "$/utils"
import { UserPayload, RouteHandler } from "$/types"
import * as schemas from "./schemas"

export const getUsers: RouteHandler<{ query: schemas.GetUsersQuery }> = async (app, { query }) => {
    const page = await getItemsPage(query.page, query.perPage, async (skip, take) => {
        const where: Prisma.UserWhereInput = {
            email: { contains: query.email, mode: "insensitive" },
            username: { contains: query.username, mode: "insensitive" }
        }

        const totalItems = await app.prisma.user.count({ where })
        const users = await app.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy: query.sort && { [query.sort]: query.order ?? "asc" },
            include: { role: true }
        })

        return { totalItems, items: users.map(dtos.user) }
    })

    return { payload: page }
}

export const getUser: RouteHandler<{ params: schemas.GetUserParams }> = async (app, { params }) => {
    const user = await app.getUser(params.id)
    return { payload: dtos.user(user) }
}

export const updateUser: RouteHandler<{
    payload: UserPayload
    params: schemas.UpdateUserParams
    body: schemas.UpdateUserBody
}> = async (app, { payload, params, body }) => {
    const user = await app.getUser(params.id)
    const userRequester = await app.getUser(payload.id)

    if (userRequester.id === user.id) {
        const updatedUser = await app.prisma.user.update({
            where: { id: params.id },
            data: {
                email: body.email,
                username: body.username,
                confirmedEmail: body.email === undefined ? undefined : false
            },
            include: { role: true }
        })

        return { payload: dtos.user(updatedUser) }
    } else {
        throw new MethodNotAllowed("No access")
    }
}
