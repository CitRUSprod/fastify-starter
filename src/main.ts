import fastify from "fastify"
import swagger from "@fastify/swagger"
import jwt from "@fastify/jwt"
import cookie from "@fastify/cookie"
import auth from "@fastify/auth"
import socketIo from "fastify-socket.io"
import { decorators } from "$/decorators"
import { routes } from "$/routes"
import { initSockets } from "$/sockets"
import { env, ajv, normalizeAjvErrors } from "$/utils"

const port = 6500

const app = fastify()

app.setValidatorCompiler(({ schema }) => ajv.compile(schema))
app.setSchemaErrorFormatter((errors, scope) => normalizeAjvErrors(errors, scope))

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
    .register(socketIo)

app.register(decorators).register(routes)

async function start() {
    await app.ready()
    await app.listen({
        host: "0.0.0.0",
        port
    })
    initSockets(app)
    console.log(`Running on http://localhost:${port}`)
}

start()
