import { User, Role, Post } from "@prisma/client"
import { JsonObject } from "type-fest"
import { UserData } from "$/types"

export function role(r: Role): JsonObject {
    return {
        id: r.id,
        name: r.name,
        permissions: r.permissions
    }
}

export function user(u: UserData): JsonObject {
    return {
        id: u.id,
        email: u.email,
        username: u.username,
        role: role(u.role),
        confirmedEmail: u.confirmedEmail,
        banned: u.banned,
        registrationDate: u.registrationDate.toJSON()
    }
}

export function post(p: Post & { author: User }): JsonObject {
    return {
        id: p.id,
        title: p.title,
        content: p.content,
        author: {
            id: p.author.id,
            username: p.author.username
        },
        creationDate: p.creationDate.toJSON(),
        editingDate: p.editingDate?.toJSON() ?? null
    }
}
