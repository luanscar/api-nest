import {
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ZodValidationOptions } from "auth/decorators/zod-validation.decorator";
import { z } from "zod";

@Injectable()
export class ZodValidationInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}
	intercept(context: ExecutionContext, next: CallHandler) {
		const request = context.switchToHttp().getRequest();

		const { body, params, query } = this.reflector.get<ZodValidationOptions>(
			"zod-schema",
			context.getHandler(),
		);

		console.log("ZodValidationInterceptor: Esquemas de validação", {
			body,
			params,
			query,
		});

		if (body) {
			const { success, error } = body.safeParse(request.body);

			if (!success) {
				if (error instanceof z.ZodError) {
					const { fieldErrors } = error.flatten();
					throw new HttpException({ error: fieldErrors }, 400);
				}
			}
		}

		if (params) {
			const { success, error } = params.safeParse(request.params);

			if (!success) {
				if (error instanceof z.ZodError) {
					const { fieldErrors } = error.flatten();
					throw new HttpException({ error: fieldErrors }, 400);
				}
			}
		}

		if (query) {
			const { success, error } = query.safeParse(request.query);

			if (!success) {
				if (error instanceof z.ZodError) {
					const { fieldErrors } = error.flatten();
					throw new HttpException({ error: fieldErrors }, 400);
				}
			}
		}

		return next.handle();
	}
}
