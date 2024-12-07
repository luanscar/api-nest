"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationSubject = void 0;
const zod_1 = require("zod");
const organization_1 = require("../models/organization");
exports.organizationSubject = zod_1.z.tuple([
    zod_1.z.union([
        zod_1.z.literal("manage"),
        zod_1.z.literal("update"),
        zod_1.z.literal("delete"),
        zod_1.z.literal("transfer_ownership"),
    ]),
    zod_1.z.union([zod_1.z.literal("Organization"), organization_1.organizationSchema]),
]);
//# sourceMappingURL=organization.js.map