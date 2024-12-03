import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { SignInInputDTO, SignUpInputDTO } from "./dto/sign-up.dto";
import { PrismaService } from "@main/infra/database/orm/prisma/prisma.service";

import { IEncoder } from "@main/infra/services/encoder.service.interface";
import { IJwtService } from "@main/infra/services/jwt.service.interface";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		@Inject("IEncoder") private readonly bcrypt: IEncoder,
		@Inject("IJwtService") private readonly jwtService: IJwtService,
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

	async signIn({ email, password }: SignInInputDTO) {
		const findUserByEmail = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!findUserByEmail) {
			throw new UnauthorizedException("User not found");
		}

		const passwordMatch = await this.bcrypt.compare(
			password,
			findUserByEmail.password,
		);

		if (!passwordMatch) {
			throw new UnauthorizedException("Invalid password");
		}

		const token = await this.jwtService.generateToken(findUserByEmail);

		return { token, user: findUserByEmail };
	}

	async validateUser(email: string, password: string) {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			const isPasswordValid = await this.bcrypt.compare(
				password,
				user.password,
			);

			if (isPasswordValid) {
				return {
					...user,
					password: undefined,
				};
			}
		}

		throw new UnauthorizedException(
			"Email address or password provided is incorrect.",
		);
	}
}
