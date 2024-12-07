"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const zod_1 = require("zod");
let ZodValidationGuard = class ZodValidationGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const schema = this.reflector.get("zod-schema", context.getHandler());
        if (schema) {
            try {
                schema.parse(request.body);
                return true;
            }
            catch (error) {
                if (error instanceof zod_1.z.ZodError) {
                    const { fieldErrors } = error.flatten();
                    throw new common_1.HttpException({ error: fieldErrors }, 400);
                }
                return false;
            }
        }
        return true;
    }
};
exports.ZodValidationGuard = ZodValidationGuard;
exports.ZodValidationGuard = ZodValidationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ZodValidationGuard);
//# sourceMappingURL=zod-validation.guard.js.map