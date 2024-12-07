import { SetMetadata, UseInterceptors, applyDecorators } from "@nestjs/common";
import { ZodSchema, z } from "zod";
import { ZodValidationInterceptor } from "../interceptors/zod-validation.interceptor";

export interface ZodValidationOptions {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
}

export const Schema = (schema: z.ZodSchema) =>
	SetMetadata("zod-schema", schema);

const SetSchema = (schemas: ZodValidationOptions) =>
	SetMetadata("zod-schema", schemas);

export const ZodValidation = (schemas: ZodValidationOptions) => {
	return applyDecorators(
		SetSchema(schemas),
		UseInterceptors(ZodValidationInterceptor),
	);
};
