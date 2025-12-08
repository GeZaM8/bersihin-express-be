import { ok } from "@/helpers/httpResponse.helper";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { TaskService } from "@/services/tasks.service";
import { Request, Response } from "express";

export class TaskController {
  static getTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await TaskService.getTasks();
    ok(res, "Berhasil", tasks);
  });
}
