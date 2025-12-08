"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
const ApiError_1 = require("@/helpers/ApiError");
const drizzle_orm_1 = require("drizzle-orm");
class OrderService {
    // Pelanggan
    static async getMyOrders(user) {
        const orders = await db_1.db
            .select()
            .from(schema_1.orders)
            .where((0, drizzle_orm_1.eq)(schema_1.orders.idUser, user.id));
        return { orders };
    }
    static async getMyOrderById(user, id) {
        const order = await db_1.db
            .select()
            .from(schema_1.orders)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.orders.id, id), (0, drizzle_orm_1.eq)(schema_1.orders.idUser, user.id)))
            .limit(1);
        return { order };
    }
    static async createOrder(data, user) {
        const order = await db_1.db
            .insert(schema_1.orders)
            .values({
            name: data.name,
            message: data.message ?? "",
            weight: data.weight ?? 0,
            estimatedTime: data.estimatedTime ?? new Date(),
            rating: 0,
            statusConfirmed: "pending",
            isCompleted: "false",
            idUser: user.id,
        })
            .execute();
        const orderId = order[0].insertId;
        await Promise.all(data.orderDetails.map((detail) => {
            return db_1.db.insert(schema_1.orderDetails).values({
                idOrder: orderId,
                idTasks: detail.idTasks,
                idUser: user.id,
                isCompleted: "false",
            });
        }));
        return {
            orderId,
        };
    }
    static async deleteOrderById(id, user) {
        const order = await db_1.db
            .select()
            .from(schema_1.orders)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.orders.id, id), (0, drizzle_orm_1.eq)(schema_1.orders.idUser, user.id), (0, drizzle_orm_1.eq)(schema_1.orders.statusConfirmed, "pending")))
            .limit(1);
        if (!order)
            throw new ApiError_1.ApiError(404, "Order not found or status not pending");
        await db_1.db.delete(schema_1.orders).where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
        return { order };
    }
    // Kasir
    static async getAllOrders() {
        const orders = await db_1.db.select().from(schema_1.orders);
        return { orders };
    }
    static async updateOrderStatusToConfirmed(id, user) {
        const order = await db_1.db
            .select()
            .from(schema_1.orders)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.orders.id, id), (0, drizzle_orm_1.eq)(schema_1.orders.idUser, user.id), (0, drizzle_orm_1.eq)(schema_1.orders.statusConfirmed, "pending")))
            .limit(1);
        if (!order)
            throw new ApiError_1.ApiError(404, "Order not found or status not pending");
        await db_1.db
            .update(schema_1.orders)
            .set({ statusConfirmed: "confirmed" })
            .where((0, drizzle_orm_1.eq)(schema_1.orders.id, id));
        return { order };
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orders.service.js.map