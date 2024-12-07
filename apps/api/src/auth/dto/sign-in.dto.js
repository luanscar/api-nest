"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInInputSchema = void 0;
const zod_1 = require("zod");
exports.signInInputSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
//# sourceMappingURL=sign-in.dto.js.map