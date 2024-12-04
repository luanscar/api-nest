import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Schema } from "./decorators/zod-validation.decorator";
import { SignInOutputDTO, signInInputSchema } from "./dto/sign-in.dto";
import { SignUpInputDTO, signUpInputSchema } from "./dto/sign-up.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	@Schema(signUpInputSchema)
	signUp(
		@Body()
		signUpOutputDTO: SignUpInputDTO,
	) {
		return this.authService.signUp(signUpOutputDTO);
	}

	@Post("sign-in")
	@Schema(signInInputSchema)
	@UseGuards(LocalAuthGuard)
	signIn(
		@Request()
		req: SignInOutputDTO,
	) {
		return this.authService.signIn(req);
	}
}
