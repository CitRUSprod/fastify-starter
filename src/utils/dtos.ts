import { User, Role, Permission, Post } from "@prisma/client"
import { JsonObject } from "type-fest"

export function user(u: User & { role: Role }): JsonObject {
    if (u.role.name === "admin") {
        for (const permission of Object.keys(Permission)) {
            u.role.permissions.push(permission as Permission)
        }
    }

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
