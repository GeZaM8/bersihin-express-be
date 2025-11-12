import { Request, Response } from "express";
import { ok } from "@/helpers/HttpResponse.helper";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { OrderService } from "@/services/orders.service";

export class OrderController {
	static getMyOrders = asyncHandler(async (req: Request, res: Response) => {
		const user = req.user;

		const orders = await OrderService.getMyOrders(user);

		ok(res, "Berhasil", orders);
	});
}
