import { PrismaService } from "@main/infra/database/orm/prisma/prisma.service";
import { IEncoder } from "@main/infra/services/encoder.service.interface";
import {
	HttpCode,
	HttpStatus,
	Inject,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "../mailer/mailer.service";
import { SignInInputPayloadDTO, SignInOutputDTO } from "./dto/sign-in.dto";
import { SignUpInputDTO } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
		@Inject("IEncoder") private readonly bcrypt: IEncoder,
		private readonly mailerService: MailerService,
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

	async recoverPassword(email: string) {
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
		console.log("Sending e-mail to", userFromEmail.email);
		this.mailerService.mailer.emit("CREATE_SEND_EMAIL", {
			name: userFromEmail.name,
			email: userFromEmail.email,
		});
		console.log("Password recover token:", code);
	}

	async resetPassword(code: string, newPassword: string) {
		const tokenFromCode = await this.prisma.token.findUnique({
			where: { id: code },
		});

		if (!tokenFromCode) {
			throw new UnauthorizedException();
		}

		const hashedPassword = await this.bcrypt.encode(newPassword);

		await this.prisma.$transaction([
			this.prisma.user.update({
				where: { id: tokenFromCode.userId },
				data: { password: hashedPassword },
			}),
			this.prisma.token.delete({
				where: { id: code },
			}),
		]);

		return HttpCode(HttpStatus.NO_CONTENT);
	}
}
