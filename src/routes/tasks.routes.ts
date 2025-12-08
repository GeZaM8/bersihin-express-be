import { TaskController } from "@/controllers/tasks.controller";
import { authenticateToken } from "@/middlewares/auth.middleware";
import { Router } from "express";
import multer from "multer";

export const taskRouter = Router();

taskRouter.use(authenticateToken);

taskRouter.get("/get-all", TaskController.getTasks);
