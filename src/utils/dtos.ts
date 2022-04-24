import { User, Post } from "@prisma/client"
import { JsonObject } from "type-fest"

export function user(u: User): JsonObject {
    return {
        id: u.id,
        email: u.email,
        username: u.username,
        role: u.role,
        verified: u.verified,
        banned: u.banned,
        registrationDate: u.registrationDate.toJSON()
    }
}

export function post(p: Post): JsonObject {
    return {
        id: p.id,
        title: p.title,
        content: p.content,
        creationDate: p.creationDate.toJSON()
    }
}
