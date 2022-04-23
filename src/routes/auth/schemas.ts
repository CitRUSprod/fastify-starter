import { JSONSchemaType } from "ajv"
import * as Types from "./types"

export const registerBody: JSONSchemaType<Types.RegisterBody> = {
    type: "object",
    properties: {
        email: { type: "string", minLength: 6, transform: ["trim", "toLowerCase"] },
        username: { type: "string", minLength: 6, maxLength: 32, transform: ["trim"] },
        password: { type: "string", minLength: 8 }
    },
    required: ["email", "username", "password"],
    additionalProperties: false
}

export const loginBody: JSONSchemaType<Types.LoginBody> = {
    type: "object",
    properties: {
        email: { type: "string", minLength: 6, transform: ["trim", "toLowerCase"] },
        password: { type: "string", minLength: 8 }
    },
    required: ["email", "password"],
    additionalProperties: false
}
