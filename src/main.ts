import fastify from "fastify"
import Ajv from "ajv"
import ajvKeywords from "ajv-keywords"
import { decorators } from "./decorators"
import { routes } from "./routes"

const port = 6500

const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true
})

ajvKeywords(ajv, ["transform"])

const app = fastify()

app.setValidatorCompiler(({ schema }) => ajv.compile(schema) as any)

app.register(decorators).register(routes)

app.listen(port, "0.0.0.0", err => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)
})
