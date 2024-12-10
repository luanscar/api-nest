import { CreateUserBodySchema, createUserBodySchema } from '@/http/schemas/user-schemas';
import { CreateUserService } from '@/services/create-user.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ZodSchema } from '../decorators/zod-validation.decorator';
import { UserPresenter } from '../presenters/user-presenter';

@Controller('/auth/sign-up')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  @ZodSchema(createUserBodySchema)
  async handle(
    @Body()
    { email, name, password }: CreateUserBodySchema,
  ) {
    const { user } = await this.createUserService.execute({
      email,
      name,
      password,
    });

    return {
      user: UserPresenter.format(user),
    };
  }
}
