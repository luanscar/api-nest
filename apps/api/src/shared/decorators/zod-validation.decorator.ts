import {
	createParamDecorator,
	ExecutionContext,
	HttpException,
} from "@nestjs/common";
import { z, ZodSchema } from "zod";

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
				if (bodyData.error instanceof z.ZodError) {
					const { fieldErrors } = bodyData.error.flatten();
					throw new HttpException({ error: fieldErrors }, 400);
				}
			}
			return { ...body };
		}

		if (schemas?.query && query) {
			const queryData = schemas.query.safeParse(query);

			if (!queryData.success) {
				if (queryData.error instanceof z.ZodError) {
					const { fieldErrors } = queryData.error.flatten();
					throw new HttpException({ error: fieldErrors }, 400);
				}
			}
			return { ...query };
		}
		if (schemas?.params && params) {
			const paramsData = schemas.params.safeParse(params);

			if (!paramsData.success) {
				if (paramsData.error instanceof z.ZodError) {
					const { fieldErrors } = paramsData.error.flatten();
					throw new HttpException({ error: fieldErrors }, 400);
				}
			}
			return { ...params };
		}
	})();
};
