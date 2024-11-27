import { Inject, Injectable } from "@nestjs/common";
import { SignUpInputDTO } from "./dto/sign-up.dto";
import { PrismaService } from "@main/infra/database/orm/prisma/prisma.service";
import { SignInOutputDTO } from "./dto/sign-in.dto";
import { IEncoder } from "@main/infra/services/encoder.service.interface";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		@Inject("IEncoder") private readonly bcrypt: IEncoder,
	) {}
	async create({ name, email, password }: SignUpInputDTO) {
		try {
			const dashedPassword = await this.bcrypt.encode(password);

			const existingUser = await this.prisma.user.findUnique({
				where: {
					email,
				},
			});
			console.log(existingUser);
			if (existingUser) {
				throw new Error("User already exists");
			}

			const newUser = await this.prisma.user.create({
				data: {
					email,
					name,
					password: dashedPassword,
				},
			});

			return newUser;
		} catch (error) {
			return error;
		}
	}

	findAll() {
		return `This action returns all auth`;
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`;
	}

	update(id: number, updateAuthDto: SignInOutputDTO) {
		return `This action updates a #${id} auth`;
	}

	remove(id: number) {
		return `This action removes a #${id} auth`;
	}
}
