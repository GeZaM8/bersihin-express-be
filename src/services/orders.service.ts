import { db } from "@/db";
import { orders as ordersTable } from "@/db/schema";
import { ApiError } from "@/helpers/ApiError";
import { UserPayload } from "@/types/auth.types";
import { OrderType } from "@/types/orders.types";
import { and, eq } from "drizzle-orm";

export class OrderService {

	// Pelanggan

	static async getMyOrders(user: UserPayload) {
		const orders = await db
			.select()
			.from(ordersTable)
			.where(eq(ordersTable.idUser, user.id));

		return { orders };
	}

	static async getMyOrderById(user: UserPayload, id: number) {
		const order = await db
			.select()
			.from(ordersTable)
			.where(and(eq(ordersTable.id, id), eq(ordersTable.idUser, user.id)))
			.limit(1);

		return { order };
	}

	static async createOrder(data: OrderType, user: UserPayload) {
		const order = await db.insert(ordersTable).values({...data, idUser: user.id});

		return { order };
	}

	static async deleteOrderById(id: number, user: UserPayload) {
		const order = await db
			.select()
			.from(ordersTable)
			.where(and(eq(ordersTable.id, id), eq(ordersTable.idUser, user.id), eq(ordersTable.statusConfirmed, 'pending')))
			.limit(1);

		if (!order) throw new ApiError(404, "Order not found or status not pending");

		await db.delete(ordersTable).where(eq(ordersTable.id, id));

		return { order };
	}


	// Kasir
	static async getAllOrders() {
		const orders = await db.select().from(ordersTable);
		return { orders };
	}

	static async updateOrderStatusToConfirmed(id: number, user: UserPayload) {
		const order = await db
			.select()
			.from(ordersTable)
			.where(and(eq(ordersTable.id, id), eq(ordersTable.idUser, user.id), eq(ordersTable.statusConfirmed, 'pending')))
			.limit(1);

		if (!order) throw new  ApiError(404, "Order not found or status not pending");

		await db.update(ordersTable)
			.set({ statusConfirmed: 'confirmed' })
			.where(eq(ordersTable.id, id));

		return { order };
	}
}
