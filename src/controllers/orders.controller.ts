import { Request, Response } from "express";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { OrderService } from "@/services/orders.service";
import { ok } from "@/helpers/httpResponse.helper";

export class OrderController {
  static getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    const orders = await OrderService.getMyOrders(user);

    ok(res, "Berhasil", orders);
  });

  static getMyOrderById = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    const order = await OrderService.getMyOrderById(user, Number(id));

    ok(res, "Berhasil", order);
  });

  static createOrder = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const data = req.body;

    const order = await OrderService.createOrder(data, user);

    ok(res, "Berhasil", order);
  });

  static deleteOrderById = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { id } = req.params;

    const order = await OrderService.deleteOrderById(Number(id), user);

    ok(res, "Berhasil", order);
  });

  static updateOrderStatusToConfirmed = asyncHandler(
    async (req: Request, res: Response) => {
      const user = req.user;
      const { id } = req.params;

      const order = await OrderService.updateOrderStatusToConfirmed(
        Number(id),
        user
      );

      ok(res, "Berhasil", order);
    }
  );

  static getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderService.getAllOrders();

    ok(res, "Berhasil", orders);
  });
}
