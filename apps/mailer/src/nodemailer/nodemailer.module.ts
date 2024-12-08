import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NodemailerProvider } from "./nodemailer.provider";
import { NodemailerService } from "./nodemailer.service";

@Module({
	providers: [NodemailerService, NodemailerProvider, ConfigService],
	exports: [NodemailerService, NodemailerProvider],
})
export class NodemailerModule {}
