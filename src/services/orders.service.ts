import { db } from "@/db";
import {
  orders as ordersTable,
  orderDetails as orderDetailsTable,
  taskLists as taskListsTable,
} from "@/db/schema";
import { ApiError } from "@/helpers/ApiError";
import { UserPayload } from "@/types/auth.types";
import { OrderRequest, OrderType } from "@/types/orders.types";
import { and, eq, inArray } from "drizzle-orm";

export class OrderService {
  // Pelanggan

  static async getMyOrders(user: UserPayload) {
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.idUser, user.id));

    return { orders };
  }

  static async getOrderById(id: number) {
    const [order] = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .limit(1);

    if (!order) return null;

    const rows = await db
      .select({
        detail: orderDetailsTable,
        task: taskListsTable,
      })
      .from(orderDetailsTable)
      .leftJoin(
        taskListsTable,
        eq(orderDetailsTable.idTasks, taskListsTable.id)
      )
      .where(eq(orderDetailsTable.idOrder, id));

    const details = rows.map((r) => ({
      ...r.detail,
      task: r.task ?? null,
    }));

    return { ...order, details };
  }

  static async createOrder(data: OrderRequest, user: UserPayload) {
    const order = await db
      .insert(ordersTable)
      .values({
        name: data.name,
        message: data.message ?? "",
        weight: data.weight ?? 0,
        rating: 0,
        statusConfirmed: "pending",
        isCompleted: "false",
        idUser: user.id,
      })
      .execute();

    const orderId = order[0].insertId;

    await Promise.all(
      data.orderDetails.map((detail) => {
        return db.insert(orderDetailsTable).values({
          idOrder: orderId,
          idTasks: detail.idTasks,
          isCompleted: "false",
        });
      })
    );

    return {
      orderId,
    };
  }
  static async deleteOrderById(id: number, user: UserPayload) {
    const order = await db
      .select()
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.id, id),
          eq(ordersTable.idUser, user.id),
          eq(ordersTable.statusConfirmed, "pending")
        )
      )
      .limit(1);

    if (!order)
      throw new ApiError(404, "Order not found or status not pending");

    await db.delete(ordersTable).where(eq(ordersTable.id, id));

    return { order };
  }

  // Kasir
  static async getAllPendingOrders() {
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.statusConfirmed, "pending"));
    return { orders };
  }

  static async updateOrderStatusToConfirmed(
    id: number,
    weight: number,
    user: UserPayload
  ) {
    const order = await db
      .select()
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.id, id),
          eq(ordersTable.idUser, user.id),
          eq(ordersTable.statusConfirmed, "pending")
        )
      )
      .limit(1);

    if (!order)
      throw new ApiError(404, "Order not found or status not pending");

    await db
      .update(ordersTable)
      .set({ statusConfirmed: "confirmed", weight: weight })
      .where(eq(ordersTable.id, id));

    return { order };
  }

  static async getForKaryawan() {
    const orders = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.statusConfirmed, "confirmed"));
    return { orders };
  }

  static async applyTask(idOrder: number, tasks: number[], idUser: number) {
    console.log(tasks);
    const orderDetail = await db
      .select()
      .from(orderDetailsTable)
      .where(
        and(
          eq(orderDetailsTable.idOrder, idOrder),
          inArray(orderDetailsTable.idTasks, tasks)
        )
      );

    if (orderDetail.length === 0)
      throw new ApiError(404, "Order detail not found");

    await db
      .update(orderDetailsTable)
      .set({ idUser })
      .where(
        and(
          eq(orderDetailsTable.idOrder, idOrder),
          inArray(orderDetailsTable.idTasks, tasks)
        )
      );

    return { orderDetail };
  }
}
