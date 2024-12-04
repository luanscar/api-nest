import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { z } from "zod";
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
	@HttpCode(HttpStatus.OK)
	signIn(
		@Request()
		req: SignInOutputDTO,
	) {
		return this.authService.signIn(req);
	}

	@Get("me")
	@HttpCode(HttpStatus.OK)
	profile(@CurrentUser() user: SignInOutputDTO) {
		return user;
	}

	@IsPublic()
	@Schema(
		z.object({
			email: z.string().email(),
		}),
	)
	@Post("password-recovery")
	resetPassword(@Body() body: { email: string }) {
		return this.authService.resetPassword(body.email);
	}
}
