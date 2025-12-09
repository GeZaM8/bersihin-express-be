import { orderDetails, orders } from "../db/schema";
export type OrderType = typeof orders.$inferSelect;
export type OrderDetailType = typeof orderDetails.$inferInsert;
export interface OrderRequest extends Omit<OrderType, "id" | "createdAt" | "updatedAt"> {
    orderDetails: OrderDetailType[];
}
//# sourceMappingURL=orders.types.d.ts.map