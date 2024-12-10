import { PrismaService } from "@/database/prisma/prisma.service";

export async function createUser(prismaService: PrismaService) {
   return await prismaService.user.create({
        data: {
            name: "luan",
            email: "luaanscar@gmail.com",
            password: "testpassword"
        }
    })
}