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

  static getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await OrderService.getOrderById(Number(id));

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
      const { weight } = req.body;

      const order = await OrderService.updateOrderStatusToConfirmed(
        Number(id),
        weight,
        user
      );

      ok(res, "Berhasil", order);
    }
  );

  static getAllPendingOrders = asyncHandler(
    async (req: Request, res: Response) => {
      const orders = await OrderService.getAllPendingOrders();

      ok(res, "Berhasil", orders);
    }
  );

  static getForKaryawan = asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderService.getForKaryawan();

    ok(res, "Berhasil", orders);
  });

  static applyTask = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { tasks } = req.body;
    const { idOrder } = req.params;

    const order = await OrderService.applyTask(Number(idOrder), tasks, user.id);

    ok(res, "Berhasil", order);
  });
}
