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
exports.ValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let ValidationMiddleware = class ValidationMiddleware {
    constructor(reflector) {
        this.reflector = reflector;
    }
    use(req, res, next) {
        const handler = req.route?.stack?.[0]?.handle;
        const schemas = this.reflector.get("zod-schema", handler);
        console.log(schemas);
        if (!schemas) {
            return next();
        }
        const { body, query, params } = schemas;
        try {
            if (body)
                body.parse(req.body);
            if (query)
                query.parse(req.query);
            if (params)
                params.parse(req.params);
        }
        catch (error) {
            return res.status(400).json({ error });
        }
        next();
    }
};
exports.ValidationMiddleware = ValidationMiddleware;
exports.ValidationMiddleware = ValidationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ValidationMiddleware);
//# sourceMappingURL=zod-validation.middleware.js.map