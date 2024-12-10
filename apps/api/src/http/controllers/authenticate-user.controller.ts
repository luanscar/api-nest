import { ZodValidationPipe } from '@/http/pipes/zod-validation-pipe';
import {
  AuthenticateUserBodySchema,
  authenticateUserBodySchema,
} from '@/http/schemas/user-schemas';
import { AuthenticateUserService } from '@/services/authenticate-user.service';
import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';

@Controller('/auth/sign-in')
export class AuthenticateUserController {
  constructor(private authenticateUserService: AuthenticateUserService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateUserBodySchema))
  async handle(@Body() { email, password }: AuthenticateUserBodySchema) {
    const { accessToken } = await this.authenticateUserService.execute({
      email,
      password,
    });

    return {
      accessToken,
    };
  }
}
