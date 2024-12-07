"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidation = exports.Schema = void 0;
const common_1 = require("@nestjs/common");
const zod_validation_interceptor_1 = require("../interceptors/zod-validation.interceptor");
const Schema = (schema) => (0, common_1.SetMetadata)("zod-schema", schema);
exports.Schema = Schema;
const SetSchema = (schemas) => (0, common_1.SetMetadata)("zod-schema", schemas);
const ZodValidation = (schemas) => {
    return (0, common_1.applyDecorators)(SetSchema(schemas), (0, common_1.UseInterceptors)(zod_validation_interceptor_1.ZodValidationInterceptor));
};
exports.ZodValidation = ZodValidation;
//# sourceMappingURL=zod-validation.decorator.js.map