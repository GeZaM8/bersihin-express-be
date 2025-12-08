"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const asyncHandler_1 = require("@/middlewares/asyncHandler");
const orders_service_1 = require("@/services/orders.service");
const httpResponse_helper_1 = require("@/helpers/httpResponse.helper");
class OrderController {
    static getMyOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = req.user;
        const orders = await orders_service_1.OrderService.getMyOrders(user);
        (0, httpResponse_helper_1.ok)(res, "Berhasil", orders);
    });
    static getMyOrderById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = req.user;
        const { id } = req.params;
        const order = await orders_service_1.OrderService.getMyOrderById(user, Number(id));
        (0, httpResponse_helper_1.ok)(res, "Berhasil", order);
    });
    static createOrder = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = req.user;
        const data = req.body;
        const order = await orders_service_1.OrderService.createOrder(data, user);
        (0, httpResponse_helper_1.ok)(res, "Berhasil", order);
    });
    static deleteOrderById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = req.user;
        const { id } = req.params;
        const order = await orders_service_1.OrderService.deleteOrderById(Number(id), user);
        (0, httpResponse_helper_1.ok)(res, "Berhasil", order);
    });
    static updateOrderStatusToConfirmed = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const user = req.user;
        const { id } = req.params;
        const order = await orders_service_1.OrderService.updateOrderStatusToConfirmed(Number(id), user);
        (0, httpResponse_helper_1.ok)(res, "Berhasil", order);
    });
    static getAllOrders = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const orders = await orders_service_1.OrderService.getAllOrders();
        (0, httpResponse_helper_1.ok)(res, "Berhasil", orders);
    });
}
exports.OrderController = OrderController;
//# sourceMappingURL=orders.controller.js.map