import Ajv from "ajv"
import { Type, Static } from "@sinclair/typebox"

const envSchema = Type.Strict(
    Type.Object(
        {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            JWT_SECRET: Type.String(),
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ENABLE_DOCS: Type.Boolean()
        },
        { additionalProperties: false }
    )
)

type Env = Static<typeof envSchema>

export function getEnv(ajv: Ajv) {
    const env = JSON.parse(JSON.stringify(process.env))
    const validate = ajv.compile(envSchema)

    if (validate(env)) {
        return env as Env
    } else {
        const err = validate.errors![0]
        const varName = err.instancePath.slice(1)
        const msg = err.message!

        throw new Error(`${varName} ${msg}`)
    }
}
