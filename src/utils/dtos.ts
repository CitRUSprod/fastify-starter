import { User, Post } from "@prisma/client"
import { JsonObject } from "type-fest"

export function user(u: User): JsonObject {
    return {
        id: u.id,
        email: u.email,
        username: u.username,
        role: u.role,
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
