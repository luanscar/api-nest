import { Module, ValidationPipe } from "@nestjs/common";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import configuration from "config/configuration";
import { APP_PIPE } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "@main/infra/database/orm/prisma/prisma.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath:
				process.env.NODE_ENV === "production"
					? ".env.production"
					: ".env.development",
			isGlobal: true,
			load: [configuration],
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
	],
	controllers: [],
	providers: [
		ConfigService,

		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
	],
})
export class AppModule {}
