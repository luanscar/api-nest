import {
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { IsPublic } from "./decorators/is-public.decorator";
import { Schema } from "./decorators/zod-validation.decorator";
import { SignInOutputDTO, signInInputSchema } from "./dto/sign-in.dto";
import { SignUpInputDTO, signUpInputSchema } from "./dto/sign-up.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@Post("sign-up")
	@Schema(signUpInputSchema)
	signUp(
		@Body()
		signUpOutputDTO: SignUpInputDTO,
	) {
		return this.authService.signUp(signUpOutputDTO);
	}

	@IsPublic()
	@Post("sign-in")
	@Schema(signInInputSchema)
	@UseGuards(LocalAuthGuard)
	signIn(
		@Request()
		req: SignInOutputDTO,
	) {
		return this.authService.signIn(req);
	}

	@Get("me")
	profile(@CurrentUser() user: SignInOutputDTO) {
		return user;
	}
}
