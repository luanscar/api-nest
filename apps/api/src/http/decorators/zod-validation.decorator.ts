import { SetMetadata, applyDecorators } from '@nestjs/common';
import type { z } from 'zod';

export interface ZodValidationOptions {
  body?: z.ZodSchema;
  query?: z.ZodSchema;
  params?: z.ZodSchema;
}

export const ZodSchema = (schema: z.ZodSchema) => SetMetadata('zod-schema', schema);

const SetSchema = (schemas: ZodValidationOptions) => SetMetadata('zod-schema', schemas);

export const ZodValidation = (schemas: ZodValidationOptions) => {
  return applyDecorators(SetSchema(schemas));
};
