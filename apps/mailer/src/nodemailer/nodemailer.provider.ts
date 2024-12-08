import * as nodemailer from "nodemailer";

import { ConfigService } from "@nestjs/config";
import * as dotenv from "dotenv";

dotenv.config();

export const NodemailerProvider = {
	provide: "NODEMAILER_PROVIDER",
	useFactory: (configService: ConfigService) => {
		const environment = process.env.NODE_ENV || "development";

		if (environment === "development") {
			dotenv.config({ path: ".env.development" });
		}

		return nodemailer.createTransport({
			host: configService.get<string>("SMTP_HOST"),
			port: parseInt(configService.get<string>("SMTP_PORT") as string) || 587,
			auth: {
				user: configService.get<string>("SMTP_USER"),
				pass: configService.get<string>("SMTP_PASS"),
			},
		});
	},
	inject: [ConfigService],
};
