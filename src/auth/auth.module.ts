import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { BcryptEncoder } from "@main/infra/services/bcrypt-encoder.service";
import { PrismaModule } from "@main/infra/database/orm/prisma/prisma.module";

dotenv.config();

@Module({
	imports: [
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: "1d" },
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: "IEncoder", // Usa um token para associar à interface
			useClass: BcryptEncoder, // Classe concreta que será injetada
		},
	],
})
export class AuthModule {}
