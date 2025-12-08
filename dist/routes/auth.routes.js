"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_controller_1 = require("@/controllers/auth.controller");
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
exports.authRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
exports.authRouter.post("/login", upload.none(), auth_controller_1.AuthController.login);
exports.authRouter.post("/register", upload.none(), auth_controller_1.AuthController.register);
exports.authRouter.post("/update-profile", auth_middleware_1.authenticateToken, auth_controller_1.AuthController.updateProfile);
//# sourceMappingURL=auth.routes.js.map