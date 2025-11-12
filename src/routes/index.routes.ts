import { Router } from "express";
import { authRouter } from "./auth.routes";
import { orderRouter } from "./orders.routes";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/orders", orderRouter)