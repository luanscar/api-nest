import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { z } from 'zod';

@Injectable()
export class ZodValidationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const schema = this.reflector.get<z.ZodSchema>('zod-schema', context.getHandler());

    if (schema) {
      try {
        schema.parse(request.body);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const { fieldErrors } = error.flatten();
          throw new HttpException({ error: fieldErrors }, 400);
        }
        return false;
      }
    }

    return true;
  }
}
