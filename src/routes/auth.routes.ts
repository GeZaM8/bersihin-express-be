import { AuthController } from "@/controllers/auth.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { Router } from "express";
import multer from "multer";

export const authRouter = Router();

const upload = multer();

authRouter.post("/login", upload.none(), AuthController.login);
authRouter.post("/register", upload.none(), AuthController.register);

authRouter.post(
  "/update-profile",
  authenticateToken,
  AuthController.updateProfile
);
