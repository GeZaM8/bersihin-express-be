import { OrderController } from "@/controllers/orders.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { Router } from "express";

export const orderRouter = Router();

orderRouter.use(authenticateToken);

orderRouter.get("/get-my", authenticateToken, OrderController.getMyOrders);
orderRouter.post("/create", authenticateToken, OrderController.createOrder);

// Kasir
orderRouter.get("/get-all", OrderController.getAllOrders);
orderRouter.put(
  "/update-status/:id",
  OrderController.updateOrderStatusToConfirmed
);

// Kasir
orderRouter.put(
  "/apply-task/:idOrder/:idTask",
  authenticateToken,
  OrderController.applyTask
);
