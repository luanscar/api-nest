import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";

import { NodemailerModule } from "./nodemailer/nodemailer.module";
import { SendEmailModule } from "./send-email/send-email.module";

import * as dotenv from "dotenv";

dotenv.config();
@Module({
	imports: [
		BullModule.forRoot({
			redis: {
				host: process.env.REDIS_HOST || "localhost",
				port: parseInt(process.env.REDIS_PORT as string) || 6379,
			},
		}),
		SendEmailModule,
		NodemailerModule,
	],
})
export class MailerModule {}
