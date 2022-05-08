import { Forbidden } from "http-errors"
import { Prisma } from "@prisma/client"
import { dtos, getItemsPage } from "$/utils"
import { RouteHandler, UserData } from "$/types"
import * as schemas from "./schemas"
import * as utils from "./utils"

export const getPosts: RouteHandler<{ query: schemas.GetPostsQuery }> = async (app, { query }) => {
    const page = await getItemsPage(query.page, query.perPage, async (skip, take) => {
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
    })

    return { payload: page }
}

export const createPost: RouteHandler<{
    userData: UserData
    body: schemas.CreatePostBody
}> = async (app, { userData, body }) => {
    const post = await app.prisma.post.create({
        data: { ...body, authorId: userData.id, creationDate: new Date() },
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
    userData: UserData
    params: schemas.UpdatePostParams
    body: schemas.UpdatePostBody
}> = async (app, { userData, params, body }) => {
    const post = await utils.getPost(app, params.id)

    if (post.authorId === userData.id) {
        const updatedPost = await app.prisma.post.update({
            where: { id: params.id },
            data: { title: body.title, content: body.content, editingDate: new Date() },
            include: { author: true }
        })

        return { payload: dtos.post(updatedPost) }
    } else {
        throw new Forbidden("No access")
    }
}

export const deletePost: RouteHandler<{
    userData: UserData
    params: schemas.DeletePostParams
}> = async (app, { userData, params }) => {
    const post = await utils.getPost(app, params.id)

    if (post.authorId === userData.id) {
        const deletedPost = await app.prisma.post.delete({
            where: { id: params.id },
            include: { author: true }
        })

        return { payload: dtos.post(deletedPost) }
    } else {
        throw new Forbidden("No access")
    }
}
