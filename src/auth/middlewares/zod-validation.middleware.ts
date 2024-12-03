import { ExecutionContext, Injectable, NestMiddleware } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
	constructor(private readonly reflector: Reflector) {}

	use(req: Request, res: Response, next: NextFunction) {
		// Obtenha informações sobre o controlador e o método (mais complexo)

		const handler = req.route?.stack?.[0]?.handle;

		// Acesse os metadados com o Reflector
		const schemas: { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema } =
			this.reflector.get("zod-schema", handler);
		console.log(schemas);
		if (!schemas) {
			return next();
		}

		// Validação com Zod
		const { body, query, params } = schemas;

		try {
			if (body) body.parse(req.body);
			if (query) query.parse(req.query);
			if (params) params.parse(req.params);
		} catch (error) {
			return res.status(400).json({ error });
		}

		next();
	}
}
