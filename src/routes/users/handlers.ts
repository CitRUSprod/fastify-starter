import { FastifyInstance } from "fastify"
import { MethodNotAllowed } from "http-errors"
import { Prisma, Role } from "@prisma/client"
import { dtos, getItemsPage, hasAccess } from "$/utils"
import { Payload } from "$/types"
import * as Types from "./types"

export async function getUsers(app: FastifyInstance, query: Types.GetUsersQuery) {
    const page = await getItemsPage(
        { page: query.page, perPage: query.perPage },
        async (skip, take) => {
            const where: Prisma.UserWhereInput = {
                email: { contains: query.email, mode: "insensitive" },
                username: { contains: query.username, mode: "insensitive" }
            }

            const totalItems = await app.prisma.user.count({ where })
            const users = await app.prisma.user.findMany({
                skip,
                take,
                where,
                orderBy: query.sort && { [query.sort]: query.order ?? "asc" }
            })

            return { totalItems, items: users.map(dtos.user) }
        }
    )

    return page
}

export async function getUser(app: FastifyInstance, params: Types.GetUserParams) {
    const user = await app.getUser(params.id)
    return dtos.user(user)
}

export async function updateUser(
    app: FastifyInstance,
    payload: Payload,
    params: Types.UpdateUserParams,
    body: Types.UpdateUserBody
) {
    const user = await app.getUser(params.id)
    const userRequester = await app.getUser(payload.id)

    if (userRequester.id === user.id || hasAccess(user, Role.Admin)) {
        const updatedUser = await app.prisma.user.update({
            where: { id: params.id },
            data: { email: body.email, username: body.username }
        })

        return dtos.user(updatedUser)
    } else {
        throw new MethodNotAllowed("No access")
    }
}
