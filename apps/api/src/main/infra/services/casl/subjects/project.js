"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSubject = void 0;
const zod_1 = require("zod");
const project_1 = require("../models/project");
exports.projectSubject = zod_1.z.tuple([
    zod_1.z.union([
        zod_1.z.literal("manage"),
        zod_1.z.literal("get"),
        zod_1.z.literal("create"),
        zod_1.z.literal("update"),
        zod_1.z.literal("delete"),
    ]),
    zod_1.z.union([zod_1.z.literal("Project"), project_1.projectSchema]),
]);
//# sourceMappingURL=project.js.map