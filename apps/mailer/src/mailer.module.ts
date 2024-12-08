import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { NodemailerModule } from "./nodemailer/nodemailer.module";
import { SendEmailModule } from "./send-email/send-email.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		BullModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				redis: {
					host: configService.get<string>("REDIS_HOST", "localhost"),
					port: configService.get<number>("REDIS_PORT", 6379),
				},
			}),
			inject: [ConfigService],
		}),
		SendEmailModule,
		NodemailerModule,
	],
})
export class MailerModule {}
