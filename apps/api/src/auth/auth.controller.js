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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const auth_service_1 = require("./auth.service");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const is_public_decorator_1 = require("./decorators/is-public.decorator");
const zod_validation_decorator_1 = require("./decorators/zod-validation.decorator");
const sign_in_dto_1 = require("./dto/sign-in.dto");
const sign_up_dto_1 = require("./dto/sign-up.dto");
const local_auth_guard_1 = require("./guards/local-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signUpOutputDTO) {
        return this.authService.signUp(signUpOutputDTO);
    }
    signIn(req) {
        return this.authService.signIn(req);
    }
    profile(user) {
        return user;
    }
    recoverPassword(body) {
        return this.authService.recoverPassword(body.email);
    }
    resetPassword(body) {
        return this.authService.resetPassword(body.code, body.password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.Post)("sign-up"),
    (0, zod_validation_decorator_1.Schema)(sign_up_dto_1.signUpInputSchema),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.Post)("sign-in"),
    (0, zod_validation_decorator_1.Schema)(sign_in_dto_1.signInInputSchema),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)("me"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "profile", null);
__decorate([
    (0, is_public_decorator_1.IsPublic)(),
    (0, zod_validation_decorator_1.Schema)(zod_1.z.object({
        email: zod_1.z.string().email(),
    })),
    (0, common_1.Post)("password-recovery"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "recoverPassword", null);
__decorate([
    (0, zod_validation_decorator_1.Schema)(zod_1.z.object({
        code: zod_1.z.string(),
        password: zod_1.z.string().min(6),
    })),
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.Post)("password-reset"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map