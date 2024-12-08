import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MailerService {
	constructor(
		@Inject("MAILER_SERVICE") private readonly mailerService: ClientProxy,
	) {}

	get mailer() {
		return this.mailerService;
	}
}
