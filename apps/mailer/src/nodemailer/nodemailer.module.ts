import { Module } from "@nestjs/common";
import { NodemailerProvider } from "./nodemailer.provider";
import { NodemailerService } from "./nodemailer.service";

@Module({
	providers: [NodemailerService, NodemailerProvider],
	exports: [NodemailerService, NodemailerProvider],
})
export class NodemailerModule {}
