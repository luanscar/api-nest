import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import {
	CreateUser,
	UpdateUser,
	UsersRepository,
} from "../contracts/contract-users.repository";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PrismaUserRepository implements UsersRepository {
	constructor(private prismaService: PrismaService) {}

	async create(data: CreateUser): Promise<User> {
		return this.prismaService.user.create({ data });
	}

	async update(data: UpdateUser): Promise<User> {
		return this.prismaService.user.update({
			where: { id: data.id },
			data,
		});
	}

	async delete(id: string): Promise<void> {
		await this.prismaService.user.delete({
			where: { id },
		});
	}

	async findById(id: string): Promise<User | null> {
		return this.prismaService.user.findUnique({
			where: { id },
		});
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.prismaService.user.findUnique({
			where: { email },
		});
	}

	async findMany(): Promise<User[]> {
		return await this.prismaService.user.findMany();
	}
}
