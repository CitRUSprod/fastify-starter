import fastify from "fastify"
import swagger from "fastify-swagger"
import jwt from "fastify-jwt"
import cookie from "fastify-cookie"
import auth from "fastify-auth"
import Ajv from "ajv"
import ajvKeywords from "ajv-keywords"
import { getEnv } from "$/utils"
import { decorators } from "$/decorators"
import { routes } from "$/routes"

const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true
})

ajvKeywords(ajv, ["transform"])

const env = getEnv(ajv)

const port = 6500

const app = fastify()

app.setValidatorCompiler(({ schema }) => ajv.compile(schema) as any)

if (env.ENABLE_DOCS) {
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

app.register(jwt, { secret: env.JWT_SECRET, cookie: { cookieName: "accessToken", signed: false } })
    .register(cookie)
    .register(auth)

app.register(decorators)
app.register(routes)

app.listen(port, "0.0.0.0", err => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)
})
