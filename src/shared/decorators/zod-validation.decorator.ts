import {
	createParamDecorator,
	ExecutionContext,
	HttpException,
} from "@nestjs/common";
import { ZodSchema } from "zod";

interface ZodValidationOptions {
	body?: ZodSchema;
	query?: ZodSchema;
	params?: ZodSchema;
}

export const ZodValidation = (schemas: ZodValidationOptions) => {
	return createParamDecorator((_: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const { body, query, params } = request;

		if (schemas?.body && body) {
			const bodyData = schemas.body.safeParse(body);

			if (!bodyData.success) {
				throw new HttpException(
					`Body validation failed: ${JSON.stringify(bodyData.error.flatten().fieldErrors)}`,
					400,
				);
			}
			return { ...body };
		}

		if (schemas?.query && query) {
			const queryData = schemas.query.safeParse(query);

			if (!queryData.success) {
				throw new HttpException(
					`Query validation failed: ${JSON.stringify(
						queryData.error.flatten().fieldErrors,
					)}`,
					400,
				);
			}
			return { ...query };
		}
		if (schemas?.params && params) {
			const paramsData = schemas.params.safeParse(params);

			if (!paramsData.success) {
				throw new HttpException(
					`Params validation failed: ${JSON.stringify(paramsData.error.flatten().fieldErrors)}`,
					400,
				);
			}
			return { ...params };
		}
	})();
};
