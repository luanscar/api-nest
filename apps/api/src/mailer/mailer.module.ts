import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MailerService } from "./mailer.service";

import * as dotenv from "dotenv";

dotenv.config();

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "MAILER_SERVICE",
				transport: Transport.REDIS,
				options: {
					host: process.env.REDIS_HOST || "localhost",
					port: parseInt(process.env.REDIS_PORT as string) || 6379,
				},
			},
		]),
	],
	providers: [MailerService],
	exports: [MailerService],
})
export class MailerModule {}
