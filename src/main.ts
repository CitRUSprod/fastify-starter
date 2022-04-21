import fastify from "fastify"
import swagger from "fastify-swagger"
import Ajv from "ajv"
import ajvKeywords from "ajv-keywords"
import { decorators } from "./decorators"
import { routes } from "./routes"

const enableDocs = process.env.ENABLE_DOCS === "true"

const port = 6500

const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true
})

ajvKeywords(ajv, ["transform"])

const app = fastify()

app.setValidatorCompiler(({ schema }) => ajv.compile(schema) as any)

if (enableDocs) {
    app.register(swagger, {
        routePrefix: "/docs",
        swagger: {
            info: {
                title: "Fastify Starter API",
                version: ""
            },
            host: `localhost:${port}`
        },
        exposeRoute: true
    })
}

app.register(decorators)
app.register(routes)

app.listen(port, "0.0.0.0", err => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)
})
