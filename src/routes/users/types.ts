import { Pagination, Sorting } from "$/types"

export interface GetUsersQuery
    extends Pagination,
        Sorting<"email" | "username" | "registrationDate"> {
    email?: string
    username?: string
}

export interface GetUserParams {
    id: number
}

export interface UpdateUserParams {
    id: number
}

export interface UpdateUserBody {
    email?: string
    username?: string
}
