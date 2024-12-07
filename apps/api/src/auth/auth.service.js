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
exports.AuthService = void 0;
const prisma_service_1 = require("../main/infra/database/orm/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(prisma, jwtService, bcrypt) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.bcrypt = bcrypt;
    }
    async signUp({ email, name, password }) {
        const dashedPassword = await this.bcrypt.encode(password);
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            throw new common_1.UnauthorizedException("User already exists");
        }
        const newUser = await this.prisma.user.create({
            data: {
                email,
                name,
                password: dashedPassword,
            },
        });
        return newUser;
    }
    async signIn({ user }) {
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
        };
        return { token: this.jwtService.sign(payload) };
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            const isPasswordValid = await this.bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }
        throw new common_1.UnauthorizedException("Email address or password provided is incorrect.");
    }
    async recoverPassword(email) {
        const userFromEmail = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!userFromEmail) {
            return common_1.HttpStatus.OK;
        }
        const { id: code } = await this.prisma.token.create({
            data: {
                type: "PASSWORD_RECOVER",
                userId: userFromEmail.id,
            },
        });
        console.log("Password recover token:", code);
    }
    async resetPassword(code, newPassword) {
        const tokenFromCode = await this.prisma.token.findUnique({
            where: { id: code },
        });
        if (!tokenFromCode) {
            throw new common_1.UnauthorizedException();
        }
        const hashedPassword = await this.bcrypt.encode(newPassword);
        await this.prisma.$transaction([
            this.prisma.user.update({
                where: { id: tokenFromCode.userId },
                data: { password: hashedPassword },
            }),
            this.prisma.token.delete({
                where: { id: code },
            }),
        ]);
        return (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)("IEncoder")),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map