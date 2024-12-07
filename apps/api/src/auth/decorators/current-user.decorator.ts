import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "../../users/entities/user.entity";
import { SignInOutputDTO } from "../dto/sign-in.dto";

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext): User => {
		const request = context.switchToHttp().getRequest<SignInOutputDTO>();

		return request.user;
	},
);
