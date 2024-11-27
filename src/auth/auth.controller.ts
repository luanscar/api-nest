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
import { SignInInputDTO, SignInOutputDTO } from "./dto/sign-in.dto";
import { SignUpInputDTO } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("sign-up")
	create(@Body() signUpInputDTO: SignUpInputDTO) {
		return this.authService.create(signUpInputDTO);
	}

	@Get()
	findAll() {
		return this.authService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.authService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateAuthDto: SignInOutputDTO) {
		return this.authService.update(+id, updateAuthDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.authService.remove(+id);
	}
}
