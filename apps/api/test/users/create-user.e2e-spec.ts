import { PrismaService } from '@/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import request from 'supertest';
import { makeApp } from '../factories/app-factory';

describe('[/POST] /auth/sign-up (e2e)', () => {
    let app: INestApplication;
    let prismaService: PrismaService

    beforeAll(async () => {
       app = await makeApp()
        prismaService = app.get(PrismaService);
        await app.init();
        await prismaService.user.create({
            data: {
                name: "luan",
                email: "luaanscar@gmail.com",
                password: hashSync("testpassword", 8)
            }
        })

    });

   

    it('should be able to create a user', async () => {
        const response =  await request(app.getHttpServer())
            .post('/auth/sign-up')
            .send({ name: "luan", email: 'testuser@gmail.com', password: 'testpassword' })
            .expect(201);

        // Verifica se o usuário foi realmente criado no banco
        const userInDatabase = await prismaService.user.findUnique({
            where: {
                email: 'testuser@gmail.com'
            }
        });
        console.log('Usuario criado:', userInDatabase);
        expect(userInDatabase).toBeTruthy();
        expect(userInDatabase?.name).toBe('luan');
        expect(userInDatabase?.email).toBe('testuser@gmail.com');
    });



    afterAll(async () => {
        await app.close();
    });
});


