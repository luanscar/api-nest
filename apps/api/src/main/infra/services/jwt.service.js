"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    async generateToken(user) {
        const JWTPayload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        return jsonwebtoken_1.default.sign(JWTPayload, process.env.JWT_SECRET, {
            expiresIn: `${process.env.JWT_EXPIRES_IN}d`,
        });
    }
}
exports.JwtService = JwtService;
//# sourceMappingURL=jwt.service.js.map