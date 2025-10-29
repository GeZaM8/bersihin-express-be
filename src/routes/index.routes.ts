import { Router } from "express";
import { authRouter } from "./auth.routes";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);