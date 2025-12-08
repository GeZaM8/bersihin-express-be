"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const orders_controller_1 = require("@/controllers/orders.controller");
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const express_1 = require("express");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.use(auth_middleware_1.authenticateToken);
exports.orderRouter.get("/get-my", auth_middleware_1.authenticateToken, orders_controller_1.OrderController.getMyOrders);
exports.orderRouter.post("/create", auth_middleware_1.authenticateToken, orders_controller_1.OrderController.createOrder);
//# sourceMappingURL=orders.routes.js.map