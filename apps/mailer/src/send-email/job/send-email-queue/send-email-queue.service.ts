import { Injectable } from "@nestjs/common";

import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";

type SendEmailQueue = {
	name: string;
	email: string;
	code: string;
};

@Injectable()
export class SendEmailQueueService {
	constructor(@InjectQueue("SEND_EMAIL_QUEUE") private sendEmailQueue: Queue) {}

	async add({ name, email, code }: SendEmailQueue) {
		await this.sendEmailQueue.add("SEND_EMAIL_QUEUE", { name, email, code });
	}
}
