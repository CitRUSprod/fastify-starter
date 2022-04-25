import { JSONSchemaType } from "ajv"
import * as Types from "./types"

export const getUsersQuery: JSONSchemaType<Types.GetUsersQuery> = {
    type: "object",
    properties: {
        page: { type: "integer", nullable: true },
        perPage: { type: "integer", nullable: true },
        sort: {
            type: "string",
            nullable: true,
            enum: ["email", "username", "registrationDate"],
            transform: ["trim"]
        },
        order: {
            type: "string",
            nullable: true,
            enum: ["asc", "desc"],
            transform: ["trim", "toLowerCase"]
        },
        email: { type: "string", nullable: true, minLength: 6, transform: ["trim", "toLowerCase"] },
        username: {
            type: "string",
            nullable: true,
            minLength: 3,
            maxLength: 32,
            transform: ["trim"]
        }
    },
    additionalProperties: false
}

export const getUserParams: JSONSchemaType<Types.GetUserParams> = {
    type: "object",
    properties: {
        id: { type: "integer" }
    },
    required: ["id"],
    additionalProperties: false
}

export const updateUserParams: JSONSchemaType<Types.UpdateUserParams> = {
    type: "object",
    properties: {
        id: { type: "integer" }
    },
    required: ["id"],
    additionalProperties: false
}

export const updateUserBody: JSONSchemaType<Types.UpdateUserBody> = {
    type: "object",
    properties: {
        email: { type: "string", nullable: true, minLength: 6, transform: ["trim", "toLowerCase"] },
        username: {
            type: "string",
            nullable: true,
            minLength: 3,
            maxLength: 32,
            transform: ["trim"]
        }
    },
    additionalProperties: false
}
