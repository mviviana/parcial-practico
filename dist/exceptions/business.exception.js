"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
class BusinessException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=business.exception.js.map