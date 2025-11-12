import { db } from "@/db";
import { orders as ordersTable } from "@/db/schema";
import { UserPayload } from "@/types/auth.types";
import { OrderType } from "@/types/orders.types";
import { eq } from "drizzle-orm";

export class OrderService {
	static async getMyOrders(user: UserPayload) {
		const orders = await db
			.select()
			.from(ordersTable)
			.where(eq(ordersTable.idUser, user.id));

		return { orders };
	}
}
