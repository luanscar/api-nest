import { NestFactory, Reflector } from "@nestjs/core";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module"; // Corrected import path
import { ConfigService } from "@nestjs/config";
import compression from "compression";
import { ValidationPipe } from "@nestjs/common";

dotenv.config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api/v1");
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true, // Transforma os dados de entrada para o tipo esperado
			whitelist: true, // Remove propriedades que não estão no DTO
			forbidNonWhitelisted: true, // Retorna erro se propriedades não permitidas forem encontradas
		}),
	);
	app.use(compression());
	const configService = app.get(ConfigService);

	const port = configService.get<number | undefined>("PORT");
	app.listen(port as number);
}
bootstrap();
