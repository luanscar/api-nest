"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressController = void 0;
class ExpressController {
    sendSuccessResponse(response, data, status = 200) {
        response.status(status).json(data);
    }
    sendErrorResponse(response, error, status = 500) {
        response.status(status).json({ error: error.message });
    }
    sendNotFoundResponse(response, message = "Not found") {
        response.status(404).json({ error: message });
    }
}
exports.ExpressController = ExpressController;
//# sourceMappingURL=express.controller.js.map