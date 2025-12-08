"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
class TaskService {
    static async getTasks() {
        const tasks = await db_1.db.select().from(schema_1.taskLists);
        return { tasks };
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=tasks.service.js.map