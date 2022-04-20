import { JSONSchemaType } from "ajv"
import * as Types from "./types"

export const getPostsQuery: JSONSchemaType<Types.GetPostsQuery> = {
    type: "object",
    properties: {
        page: { type: "integer", nullable: true },
        perPage: { type: "integer", nullable: true },
        sort: {
            type: "string",
            nullable: true,
            enum: ["title", "creationDate"],
            transform: ["trim"]
        },
        order: {
            type: "string",
            nullable: true,
            enum: ["asc", "desc"],
            transform: ["trim", "toLowerCase"]
        },
        title: { type: "string", nullable: true, minLength: 1, transform: ["trim"] }
    },
    additionalProperties: false
}

export const createPostBody: JSONSchemaType<Types.CreatePostBody> = {
    type: "object",
    properties: {
        title: { type: "string", minLength: 1, maxLength: 64, transform: ["trim"] },
        content: { type: "string", minLength: 1, transform: ["trim"] }
    },
    required: ["title", "content"],
    additionalProperties: false
}

export const getPostParams: JSONSchemaType<Types.GetPostParams> = {
    type: "object",
    properties: {
        id: { type: "integer" }
    },
    required: ["id"],
    additionalProperties: false
}

export const updatePostParams: JSONSchemaType<Types.UpdatePostParams> = {
    type: "object",
    properties: {
        id: { type: "integer" }
    },
    required: ["id"],
    additionalProperties: false
}

export const updatePostBody: JSONSchemaType<Types.UpdatePostBody> = {
    type: "object",
    properties: {
        title: { type: "string", nullable: true, minLength: 1, maxLength: 64, transform: ["trim"] },
        content: { type: "string", nullable: true, minLength: 1, transform: ["trim"] }
    },
    additionalProperties: false
}

export const deletePostParams: JSONSchemaType<Types.DeletePostParams> = {
    type: "object",
    properties: {
        id: { type: "integer" }
    },
    required: ["id"],
    additionalProperties: false
}
