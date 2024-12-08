import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { MailerModule } from "./mailer.module";

import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		MailerModule,
		{
			transport: Transport.REDIS,
			options: {
				host: process.env.REDIS_HOST || "localhost",
				port: parseInt(process.env.REDIS_PORT as string) || 6379,
			},
		},
	);
	await app.listen();
}
bootstrap();
