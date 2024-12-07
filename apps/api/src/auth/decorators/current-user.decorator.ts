import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { SignInOutputDTO } from "auth/dto/sign-in.dto";
import { User } from "users/entities/user.entity";

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): User => {
		const request = context.switchToHttp().getRequest<SignInOutputDTO>();

		return request.user;
	},
);
