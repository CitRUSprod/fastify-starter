import { FastifyInstance } from "fastify"
import { BadRequest } from "http-errors"

export async function checkPost(app: FastifyInstance, id: number) {
    const post = await app.prisma.post.findFirst({ where: { id } })
    if (!post) throw new BadRequest("Post with such ID was not found")
}
