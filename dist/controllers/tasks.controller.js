"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const httpResponse_helper_1 = require("../helpers/httpResponse.helper");
const asyncHandler_1 = require("../middlewares/asyncHandler");
const tasks_service_1 = require("../services/tasks.service");
class TaskController {
    static getTasks = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const tasks = await tasks_service_1.TaskService.getTasks();
        (0, httpResponse_helper_1.ok)(res, "Berhasil", tasks);
    });
}
exports.TaskController = TaskController;
//# sourceMappingURL=tasks.controller.js.map