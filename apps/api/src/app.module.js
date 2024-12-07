"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./main/infra/database/orm/prisma/prisma.module");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const configuration_1 = __importDefault(require("./config/configuration"));
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const zod_validation_guard_1 = require("./auth/guards/zod-validation.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === "production"
                    ? ".env.production"
                    : ".env.development",
                isGlobal: true,
                load: [configuration_1.default],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [],
        providers: [
            config_1.ConfigService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: zod_validation_guard_1.ZodValidationGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map