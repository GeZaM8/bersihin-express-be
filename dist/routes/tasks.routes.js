"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const tasks_controller_1 = require("../controllers/tasks.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const express_1 = require("express");
exports.taskRouter = (0, express_1.Router)();
exports.taskRouter.use(auth_middleware_1.authenticateToken);
exports.taskRouter.get("/get-all", tasks_controller_1.TaskController.getTasks);
//# sourceMappingURL=tasks.routes.js.map