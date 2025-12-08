import { db } from "@/db";
import { taskLists } from "@/db/schema";

export class TaskService {
  static async getTasks() {
    const tasks = await db.select().from(taskLists);
    return { tasks };
  }
}
