"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationSchema = void 0;
const zod_1 = require("zod");
exports.organizationSchema = zod_1.z.object({
    __typename: zod_1.z.literal('Organization').default('Organization'),
    id: zod_1.z.string(),
    ownerId: zod_1.z.string(),
});
//# sourceMappingURL=organization.js.map