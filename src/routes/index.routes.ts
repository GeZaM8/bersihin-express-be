import { Router } from "express";
import { authRouter } from "./auth.routes";
import { orderRouter } from "./orders.routes";
import { taskRouter } from "./tasks.routes";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/tasks", taskRouter);
