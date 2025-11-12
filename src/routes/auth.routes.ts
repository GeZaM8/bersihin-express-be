import { AuthController } from "@/controllers/auth.controller";
import { Router } from "express";
import multer from "multer";

export const authRouter = Router();

const upload = multer();

authRouter.post("/login", upload.none(), AuthController.login);
authRouter.post("/register", upload.none(),AuthController.register)