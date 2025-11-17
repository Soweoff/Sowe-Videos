"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/errors/AppError.ts
class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
exports.default = AppError;
