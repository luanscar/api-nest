"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpInputSchema = void 0;
const zod_1 = require("zod");
exports.signUpInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
//# sourceMappingURL=sign-up.dto.js.map