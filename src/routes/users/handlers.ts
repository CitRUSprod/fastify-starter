import { Prisma } from "@prisma/client"
import { dtos, getItemsPage } from "$/utils"
import { RouteHandler } from "$/types"
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
