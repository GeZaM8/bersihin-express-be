"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const orders_routes_1 = require("./orders.routes");
const tasks_routes_1 = require("./tasks.routes");
exports.rootRouter = (0, express_1.Router)();
exports.rootRouter.use("/auth", auth_routes_1.authRouter);
exports.rootRouter.use("/orders", orders_routes_1.orderRouter);
exports.rootRouter.use("/tasks", tasks_routes_1.taskRouter);
//# sourceMappingURL=index.routes.js.map