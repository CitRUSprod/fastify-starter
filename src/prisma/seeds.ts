import { PrismaClient, Role } from "@prisma/client"
import argon2 from "argon2"

const client = new PrismaClient()

client.$connect().then(async () => {
    const password = await argon2.hash("12345678")
    await client.user.create({
        data: {
            email: "admin@example.com",
            username: "Admin",
            password,
            role: Role.Admin,
            registrationDate: new Date()
        }
    })
})
