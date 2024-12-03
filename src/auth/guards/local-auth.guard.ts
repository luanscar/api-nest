import {
	BadRequestException,
	CallHandler,
	ExecutionContext,
	HttpException,
	Injectable,
	UnauthorizedException,
	UseInterceptors,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import {
	ZodValidation,
	ZodValidationOptions,
} from "auth/decorators/zod-validation.decorator";
import { ZodValidationInterceptor } from "auth/interceptors/zod-validation.interceptor";
import { Observable } from "rxjs";
import { z, ZodSchema } from "zod";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
	constructor(private readonly reflector: Reflector) {
		super();
	}
	canActivate(context: ExecutionContext) {
		// const request = context.switchToHttp().getRequest();
		// const { body } = this.reflector.get<ZodValidationOptions>(
		// 	"zod-schema",
		// 	context.getHandler(),
		// );

		// if (body) {
		// 	const { success, error } = body.safeParse(request.body);

		// 	if (!success) {
		// 		if (error instanceof z.ZodError) {
		// 			const { fieldErrors } = error.flatten();
		// 			throw new HttpException({ error: fieldErrors }, 400);
		// 		}
		// 	}
		// }

		return super.canActivate(context);
	}

	handleRequest(err: any, user: any) {
		if (err || !user) {
			throw new UnauthorizedException(err?.message);
		}

		return user;
	}
}
