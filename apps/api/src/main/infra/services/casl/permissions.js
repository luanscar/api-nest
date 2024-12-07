"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
exports.permissions = {
    ADMIN(user, { can, cannot }) {
        can("manage", "all");
        cannot(["transfer_ownership", "update"], "Organization");
        can(["transfer_ownership", "update"], "Organization", {
            ownerId: { $eq: user.id },
        });
    },
    MODERATOR(user, { can }) {
        can("get", "User");
        can(["create", "get"], "Project");
        can(["update", "delete"], "Project", { ownerId: { $eq: user.id } });
    },
    USER(_, { can }) {
        can("manage", "Billing");
    },
};
//# sourceMappingURL=permissions.js.map