import { FastifyInstance } from "fastify"
import { Prisma } from "@prisma/client"
import { getItemsPage } from "$/utils"
import * as utils from "./utils"
import * as Types from "./types"

export async function getPosts(app: FastifyInstance, query: Types.GetPostsQuery) {
    const page = await getItemsPage(
        { page: query.page, perPage: query.perPage },
        async (skip, take) => {
            const where: Prisma.PostWhereInput = {
                title: { contains: query.title, mode: "insensitive" }
            }

            const totalItems = await app.prisma.post.count({ where })
            const posts = await app.prisma.post.findMany({
                skip,
                take,
                where,
                orderBy: query.sort && { [query.sort]: query.order ?? "asc" }
            })

            return { totalItems, items: posts }
        }
    )

    return page
}

export async function createPost(app: FastifyInstance, body: Types.CreatePostBody) {
    const post = await app.prisma.post.create({ data: { ...body, creationDate: new Date() } })
    return post
}

export async function getPost(app: FastifyInstance, params: Types.GetPostParams) {
    await utils.checkPost(app, params.id)
    const post = await app.prisma.post.findFirst({ where: { id: params.id } })
    return post
}

export async function updatePost(
    app: FastifyInstance,
    params: Types.UpdatePostParams,
    body: Types.UpdatePostBody
) {
    await utils.checkPost(app, params.id)

    const post = await app.prisma.post.update({
        where: { id: params.id },
        data: { title: body.title, content: body.content }
    })

    return post
}

export async function deletePost(app: FastifyInstance, params: Types.DeletePostParams) {
    await utils.checkPost(app, params.id)
    const post = await app.prisma.post.delete({ where: { id: params.id } })
    return post
}
