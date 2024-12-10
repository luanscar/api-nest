import { HttpException, HttpStatus } from '@nestjs/common';

type ValidationError = {
  [key: string | number | symbol]: string[] | undefined;
};

export class ZodValidationFailedError extends HttpException {
  constructor(errors: ValidationError) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation error',
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
