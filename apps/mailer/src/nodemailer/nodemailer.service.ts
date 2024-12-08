import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { NodemailerProvider } from "./nodemailer.provider";

type SendEmailHandler = {
	name: string;
	email: string;
	code: string;
};

@Injectable()
export class NodemailerService {
	constructor(
		@Inject(NodemailerProvider.provide)
		private readonly nodemailerProvider: nodemailer.Transporter<SentMessageInfo>,
		private readonly configService: ConfigService,
	) {}

	async handler({ name, email, code }: SendEmailHandler) {
		const fromEmail = this.configService.get("MAIL_FROM");
		const appName = this.configService.get("APP_NAME");
		const clientUrl = this.configService.get("CLIENT_URL");

		const recoveryUrl = `${clientUrl}/recovery?code=${code}`;

		await this.nodemailerProvider.sendMail({
			from: `"${appName}" <${fromEmail}>`,
			to: email,
			subject: `Redefinição de Senha - ${appName}`,
			html: `
      <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de Senha</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.5;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        h1 {
            color: #007bff;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Redefinição de Senha</h1>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta em ${appName}.</p>
        <p>Para redefinir sua senha, clique no botão abaixo:</p>
        <a href=${recoveryUrl} class="button">Redefinir Senha</a>
        <p>Se você não solicitou a redefinição de senha, ignore este email.</p>
        <p>Atenciosamente,<br>${appName}</p>
    </div>
</body>
</html>`,
		});
	}
}
