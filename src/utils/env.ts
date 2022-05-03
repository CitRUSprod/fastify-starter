import * as schemas from "$/schemas"
import { parseByAjvSchema } from "./ajv"

export const env = parseByAjvSchema(schemas.env, process.env, "env")
