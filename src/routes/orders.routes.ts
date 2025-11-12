import { OrderController } from "@/controllers/orders.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { Router } from "express";

export const orderRouter = Router();

orderRouter.use(authenticateToken);

orderRouter.get("/get-my", authenticateToken, OrderController.getMyOrders);
