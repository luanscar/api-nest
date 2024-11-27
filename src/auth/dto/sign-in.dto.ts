import { User } from "users/entities/user.entity";

export interface SignInInputDTO {
	email: string;
	password: string;
}

export interface SignInOutputDTO {
	token: string;
	user: User;
}
