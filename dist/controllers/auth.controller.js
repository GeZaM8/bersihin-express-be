"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const httpResponse_helper_1 = require("../helpers/httpResponse.helper");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return (0, httpResponse_helper_1.badRequest)(res, "Username/email dan password harus diisi");
        }
        const result = await auth_service_1.AuthService.login({ username, password });
        (0, httpResponse_helper_1.ok)(res, "Login berhasil", result);
    });
    static register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { name, email, username, phone, photo, address, birth, password, } = req.body;
        if (!name ||
            !email ||
            !username ||
            !phone ||
            !address ||
            !birth ||
            !password) {
            return (0, httpResponse_helper_1.badRequest)(res, "Semua field harus diisi");
        }
        if (password.length < 8) {
            return (0, httpResponse_helper_1.badRequest)(res, "Password minimal 8 karakter");
        }
        const result = await auth_service_1.AuthService.register({
            name,
            email,
            username,
            phone,
            photo,
            address,
            birth,
            password,
        });
        (0, httpResponse_helper_1.created)(res, "Register berhasil", result);
    });
    static updateProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { id } = req.user;
        const data = req.body;
        const result = await auth_service_1.AuthService.updateProfile(Number(id), data);
        (0, httpResponse_helper_1.ok)(res, "Update profile berhasil", result);
    });
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map