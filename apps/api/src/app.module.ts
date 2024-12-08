import { Module } from "@nestjs/common";

import { PrismaModule } from "@main/infra/database/orm/prisma/prisma.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

import configuration from "@config/configuration";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { ZodValidationGuard } from "./auth/guards/zod-validation.guard";
import { MailerModule } from "./mailer/mailer.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath:
				process.env.NODE_ENV === "production"
					? ".env.production"
					: ".env.development",
			isGlobal: true,
			load: [configuration],
			expandVariables: true,
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		MailerModule,
	],
	controllers: [],
	providers: [
		ConfigService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},

		{
			provide: APP_GUARD,
			useClass: ZodValidationGuard,
		},
	],
})
export class AppModule {}
