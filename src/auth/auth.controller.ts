import {
	Controller,
	Post,
	Body,
	UseGuards,
	UseInterceptors,
	UsePipes,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
	SignInInputDTO,
	signInInputSchema,
	SignUpInputDTO,
	signUpInputSchema,
} from "./dto/sign-up.dto";
import { Schema, ZodValidation } from "./decorators/zod-validation.decorator";
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
		@Body()
		signUpOutputDTO: SignInInputDTO,
	) {
		return this.authService.signIn(signUpOutputDTO);
	}
}
