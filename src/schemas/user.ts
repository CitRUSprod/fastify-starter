import { Type } from "@sinclair/typebox"

export function email() {
    return Type.String({ minLength: 6, transform: ["trim", "toLowerCase"] })
}

export function username() {
    return Type.String({ minLength: 3, maxLength: 32, transform: ["trim"] })
}

export function password() {
    return Type.String({ minLength: 3 })
}
