import { FastifyInstance } from "fastify"
import { MethodNotAllowed } from "http-errors"
import { Prisma, Role } from "@prisma/client"
import { dtos, getItemsPage, hasAccess } from "$/utils"
import { Payload } from "$/types"
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
                orderBy: query.sort && { [query.sort]: query.order ?? "asc" },
                include: { author: true }
            })

            return { totalItems, items: posts.map(dtos.post) }
        }
    )

    return page
}

export async function createPost(
    app: FastifyInstance,
    payload: Payload,
    body: Types.CreatePostBody
) {
    const user = await app.getUser(payload.id)
    const post = await app.prisma.post.create({
        data: { ...body, authorId: user.id, creationDate: new Date() },
        include: { author: true }
    })

    return dtos.post(post)
}

export async function getPost(app: FastifyInstance, params: Types.GetPostParams) {
    await utils.getPost(app, params.id)

    const post = (await app.prisma.post.findFirst({
        where: { id: params.id },
        include: { author: true }
    }))!

    return dtos.post(post)
}

export async function updatePost(
    app: FastifyInstance,
    payload: Payload,
    params: Types.UpdatePostParams,
    body: Types.UpdatePostBody
) {
    const post = await utils.getPost(app, params.id)
    const user = await app.getUser(payload.id)

    if (post.authorId === user.id || hasAccess(user, Role.Admin)) {
        const updatedPost = await app.prisma.post.update({
            where: { id: params.id },
            data: { title: body.title, content: body.content, editingDate: new Date() },
            include: { author: true }
        })

        return dtos.post(updatedPost)
    } else {
        throw new MethodNotAllowed("No access")
    }
}

export async function deletePost(
    app: FastifyInstance,
    payload: Payload,
    params: Types.DeletePostParams
) {
    const post = await utils.getPost(app, params.id)
    const user = await app.getUser(payload.id)

    if (post.authorId === user.id || hasAccess(user, Role.Admin)) {
        const deletedPost = await app.prisma.post.delete({
            where: { id: params.id },
            include: { author: true }
        })

        return dtos.post(deletedPost)
    } else {
        throw new MethodNotAllowed("No access")
    }
}
