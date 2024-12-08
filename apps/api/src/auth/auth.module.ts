import { PrismaModule } from "@main/infra/database/orm/prisma/prisma.module";
import { BcryptEncoder } from "@main/infra/services/bcrypt-encoder.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { MailerModule } from "../mailer/mailer.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

dotenv.config();

@Module({
	imports: [
		PrismaModule,
		JwtModule.register({
			global: true,
			secret: "process.env.JWT_SECRET",
			signOptions: { expiresIn: "1d" },
		}),
		MailerModule,
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		{
			provide: "IEncoder", // Usa um token para associar à interface
			useClass: BcryptEncoder, // Classe concreta que será injetada
		},
	],
})
export class AuthModule {}
