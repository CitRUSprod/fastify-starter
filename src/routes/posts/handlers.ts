import { MethodNotAllowed } from "http-errors"
import { Prisma, Role } from "@prisma/client"
import { dtos, getItemsPage, hasAccess } from "$/utils"
import { UserPayload, RouteHandler } from "$/types"
import * as schemas from "./schemas"
import * as utils from "./utils"

export const getPosts: RouteHandler<{ query: schemas.GetPostsQuery }> = async (app, { query }) => {
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

    return { payload: page }
}

export const createPost: RouteHandler<{
    payload: UserPayload
    body: schemas.CreatePostBody
}> = async (app, { payload, body }) => {
    const user = await app.getUser(payload.id)
    const post = await app.prisma.post.create({
        data: { ...body, authorId: user.id, creationDate: new Date() },
        include: { author: true }
    })

    return { payload: dtos.post(post) }
}

export const getPost: RouteHandler<{ params: schemas.GetPostParams }> = async (app, { params }) => {
    await utils.getPost(app, params.id)

    const post = (await app.prisma.post.findFirst({
        where: { id: params.id },
        include: { author: true }
    }))!

    return { payload: dtos.post(post) }
}

export const updatePost: RouteHandler<{
    payload: UserPayload
    params: schemas.UpdatePostParams
    body: schemas.UpdatePostBody
}> = async (app, { payload, params, body }) => {
    const post = await utils.getPost(app, params.id)
    const user = await app.getUser(payload.id)

    if (post.authorId === user.id || hasAccess(user, Role.Admin)) {
        const updatedPost = await app.prisma.post.update({
            where: { id: params.id },
            data: { title: body.title, content: body.content, editingDate: new Date() },
            include: { author: true }
        })

        return { payload: dtos.post(updatedPost) }
    } else {
        throw new MethodNotAllowed("No access")
    }
}

export const deletePost: RouteHandler<{
    payload: UserPayload
    params: schemas.DeletePostParams
}> = async (app, { payload, params }) => {
    const post = await utils.getPost(app, params.id)
    const user = await app.getUser(payload.id)

    if (post.authorId === user.id || hasAccess(user, Role.Admin)) {
        const deletedPost = await app.prisma.post.delete({
            where: { id: params.id },
            include: { author: true }
        })

        return { payload: dtos.post(deletedPost) }
    } else {
        throw new MethodNotAllowed("No access")
    }
}
