"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidation = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const ZodValidation = (schemas) => {
    return (0, common_1.createParamDecorator)((_, ctx) => {
        const request = ctx.switchToHttp().getRequest();
        const { body, query, params } = request;
        if (schemas?.body && body) {
            const bodyData = schemas.body.safeParse(body);
            if (!bodyData.success) {
                if (bodyData.error instanceof zod_1.z.ZodError) {
                    const { fieldErrors } = bodyData.error.flatten();
                    throw new common_1.HttpException({ error: fieldErrors }, 400);
                }
            }
            return { ...body };
        }
        if (schemas?.query && query) {
            const queryData = schemas.query.safeParse(query);
            if (!queryData.success) {
                if (queryData.error instanceof zod_1.z.ZodError) {
                    const { fieldErrors } = queryData.error.flatten();
                    throw new common_1.HttpException({ error: fieldErrors }, 400);
                }
            }
            return { ...query };
        }
        if (schemas?.params && params) {
            const paramsData = schemas.params.safeParse(params);
            if (!paramsData.success) {
                if (paramsData.error instanceof zod_1.z.ZodError) {
                    const { fieldErrors } = paramsData.error.flatten();
                    throw new common_1.HttpException({ error: fieldErrors }, 400);
                }
            }
            return { ...params };
        }
    })();
};
exports.ZodValidation = ZodValidation;
//# sourceMappingURL=zod-validation.decorator.js.map