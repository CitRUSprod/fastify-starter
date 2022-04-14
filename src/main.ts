import fastify from "fastify"

const port = 6500

const nodeEnv = process.env.NODE_ENV!
const message = process.env.MESSAGE!

const app = fastify()

app.get("/", async () => ({
    nodeEnv,
    message
}))

app.listen(port, "0.0.0.0", err => {
    if (err) throw err
    console.log(`Running on http://localhost:${port}`)
})
