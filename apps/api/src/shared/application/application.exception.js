"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationException = void 0;
class ApplicationException extends Error {
    constructor(message = "⚠️ Exceção de aplicação genérica") {
        super(message);
        this.name = "ApplicationException";
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationException = ApplicationException;
//# sourceMappingURL=application.exception.js.map