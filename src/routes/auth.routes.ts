import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/login", AuthController.login);