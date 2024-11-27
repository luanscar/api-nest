import { IsPasswordConfirmed } from "auth/decorators/is-password-confirmed";
import { IsEmail, IsString, IsStrongPassword, Matches } from "class-validator";
import { User } from "users/entities/user.entity";

export class SignUpInputDTO {
	@IsString()
	name: string;
	@IsEmail()
	email: string;
	@IsString()
	@IsStrongPassword()
	password: string;
	@IsString()
	@IsStrongPassword()
	@IsPasswordConfirmed("password")
	password_confirmation: string;
}

export class SignUpOutputDTO {
	user: User;
}
