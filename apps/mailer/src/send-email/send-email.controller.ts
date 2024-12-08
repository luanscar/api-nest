import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

import { CreateSendEmailDto } from "./dto/create-send-email.dto";
import { SendEmailService } from "./send-email.service";

@Controller()
export class SendEmailController {
	constructor(private readonly sendEmailService: SendEmailService) {}

	@MessagePattern("PASSWORD_RECOVER")
	async sendEmail(@Payload() createSendEmailDto: CreateSendEmailDto) {
		console.log("Received message", createSendEmailDto);
		await this.sendEmailService.sendEmail(createSendEmailDto);
	}
}
