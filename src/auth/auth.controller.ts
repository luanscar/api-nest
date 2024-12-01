import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
	SignInInputDTO,
	signInInputSchema,
	SignUpInputDTO,
	signUpInputSchema,
} from "./dto/sign-up.dto";
import { ZodValidation } from "@shared/decorators/zod-validation.decorator";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	signUp(
		@ZodValidation({
			body: signUpInputSchema,
		})
		@Body()
		signUpOutputDTO: SignUpInputDTO,
	) {
		return this.authService.signUp(signUpOutputDTO);
	}

	@Post("sign-in")
	signIn(
		@ZodValidation({
			body: signInInputSchema,
		})
		@Body()
		signUpOutputDTO: SignInInputDTO,
	) {
		return this.authService.signIn(signUpOutputDTO);
	}
}
