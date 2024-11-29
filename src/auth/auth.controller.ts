import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignUpInputDTO, SignUpOutputDTO } from "./dto/sign-up.dto";
import { ZodValidation } from "@shared/decorators/zod-validation.decorator";
import { z } from "zod";

const bodySchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	signUp(
		@ZodValidation({
			body: bodySchema,
		})
		@Body()
		signUpOutputDTO: SignUpInputDTO,
	) {
		return this.authService.signUp(signUpOutputDTO);
	}
}
