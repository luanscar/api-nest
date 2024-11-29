import { IsPasswordConfirmed } from "auth/decorators/is-password-confirmed";
import { IsEmail, IsString, IsStrongPassword, Matches } from "class-validator";
import { User } from "users/entities/user.entity";

export interface SignUpInputDTO {
	name: string;
	email: string;
	password: string;
	password_confirmation?: string;
}

export class SignUpOutputDTO {
	user: User;
}
