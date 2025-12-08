import { taskLists } from "@/db/schema";

export type TaskType = typeof taskLists.$inferSelect;
