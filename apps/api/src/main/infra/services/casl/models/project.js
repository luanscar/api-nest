"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    __typename: zod_1.z.literal('Project').default('Project'),
    id: zod_1.z.string(),
    ownerId: zod_1.z.string(),
});
//# sourceMappingURL=project.js.map