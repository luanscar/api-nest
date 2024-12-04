import { PrismaService } from "@main/infra/database/orm/prisma/prisma.service";
import { IEncoder } from "@main/infra/services/encoder.service.interface";
import {
	HttpStatus,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInInputPayloadDTO, SignInOutputDTO } from "./dto/sign-in.dto";
import { SignUpInputDTO } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
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

	async signIn({ user }: SignInOutputDTO) {
		const payload: SignInInputPayloadDTO = {
			sub: user.id as string,
			email: user.email,
			name: user.name,
		};

		return { token: this.jwtService.sign(payload) };
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

	async resetPassword(email: string) {
		const userFromEmail = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!userFromEmail) {
			// We don't want to people to know if the user really exists
			return HttpStatus.OK;
		}

		const { id: code } = await this.prisma.token.create({
			data: {
				type: "PASSWORD_RECOVER",
				userId: userFromEmail.id,
			},
		});

		// Send e-mail with password recover link

		console.log("Password recover token:", code);
	}
}
