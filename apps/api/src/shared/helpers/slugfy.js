"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugfy = slugfy;
function slugfy(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
//# sourceMappingURL=slugfy.js.map