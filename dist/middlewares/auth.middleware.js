"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticateToken = void 0;
const auth_service_1 = require("../services/auth.service");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token akses diperlukan" });
        }
        const decoded = await auth_service_1.AuthService.verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Token tidak valid" });
    }
};
exports.authenticateToken = authenticateToken;
const authorize = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map