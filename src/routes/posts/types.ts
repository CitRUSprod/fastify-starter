import { Pagination, Sorting } from "$/types"

export interface GetPostsQuery extends Pagination, Sorting<"title" | "creationDate"> {
    title?: string
}

export interface CreatePostBody {
    title: string
    content: string
}

export interface GetPostParams {
    id: number
}

export interface UpdatePostParams {
    id: number
}

export interface UpdatePostBody {
    title?: string
    content?: string
}

export interface DeletePostParams {
    id: number
}
