import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignUpInputDTO } from "./dto/sign-up.dto";
import { PrismaService } from "@main/infra/database/orm/prisma/prisma.service";

import { IEncoder } from "@main/infra/services/encoder.service.interface";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		@Inject("IEncoder") private readonly bcrypt: IEncoder,
	) {}

	async signUp({ email, name, password }: SignUpInputDTO) {
		const dashedPassword = await this.bcrypt.encode(password);

		const existingUser = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			throw new UnauthorizedException("User already exists");
		}

		const newUser = await this.prisma.user.create({
			data: {
				email,
				name,
				password: dashedPassword,
			},
		});

		return newUser;
	}

	// async signIn() {
	// 	return `This action returns all auth`;
	// }
}
