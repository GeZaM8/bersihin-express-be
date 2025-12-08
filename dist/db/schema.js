"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetails = exports.users = exports.taskLists = exports.roles = exports.orderDetails = exports.orders = exports.comments = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.comments = (0, mysql_core_1.mysqlTable)("comments", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    idOrder: (0, mysql_core_1.int)("id_order").notNull().references(() => exports.orders.id, { onDelete: "cascade", onUpdate: "cascade" }),
    title: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    description: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    photo: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
    (0, mysql_core_1.index)("id_order").on(table.idOrder),
]);
exports.orders = (0, mysql_core_1.mysqlTable)("orders", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    idUser: (0, mysql_core_1.int)("id_user").notNull().references(() => exports.users.id),
    name: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    message: (0, mysql_core_1.text)().default('NULL'),
    weight: (0, mysql_core_1.float)().notNull(),
    estimatedTime: (0, mysql_core_1.datetime)("estimated_time", { mode: 'string' }).notNull(),
    rating: (0, mysql_core_1.int)().notNull(),
    statusConfirmed: (0, mysql_core_1.mysqlEnum)("status_confirmed", ['confirmed', 'pending', 'rejected']).notNull(),
    isCompleted: (0, mysql_core_1.tinytext)("is_completed").notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
});
exports.orderDetails = (0, mysql_core_1.mysqlTable)("order_details", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    idOrder: (0, mysql_core_1.int)("id_order").notNull().references(() => exports.orders.id, { onDelete: "cascade", onUpdate: "cascade" }),
    idTasks: (0, mysql_core_1.int)("id_tasks").notNull().references(() => exports.taskLists.id, { onDelete: "cascade", onUpdate: "cascade" }),
    idUser: (0, mysql_core_1.int)("id_user").notNull().references(() => exports.users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    isCompleted: (0, mysql_core_1.tinytext)("is_completed").notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
    (0, mysql_core_1.index)("id_order").on(table.idOrder),
    (0, mysql_core_1.index)("id_tasks").on(table.idTasks),
]);
exports.roles = (0, mysql_core_1.mysqlTable)("roles", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    name: (0, mysql_core_1.varchar)({ length: 10 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
});
exports.taskLists = (0, mysql_core_1.mysqlTable)("task_lists", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    name: (0, mysql_core_1.varchar)({ length: 100 }).notNull(),
    description: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    price: (0, mysql_core_1.int)().notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
});
exports.users = (0, mysql_core_1.mysqlTable)("users", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    email: (0, mysql_core_1.varchar)({ length: 100 }).notNull(),
    username: (0, mysql_core_1.varchar)({ length: 50 }).notNull(),
    password: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    idRole: (0, mysql_core_1.int)("id_role").notNull().references(() => exports.roles.id, { onDelete: "cascade", onUpdate: "cascade" }),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
    (0, mysql_core_1.index)("id_role").on(table.idRole),
]);
exports.userDetails = (0, mysql_core_1.mysqlTable)("user_details", {
    id: (0, mysql_core_1.int)().autoincrement().notNull().primaryKey(),
    userId: (0, mysql_core_1.int)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade", onUpdate: "cascade" }),
    name: (0, mysql_core_1.varchar)({ length: 100 }).notNull(),
    address: (0, mysql_core_1.text)().notNull(),
    phone: (0, mysql_core_1.varchar)({ length: 16 }).notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    birth: (0, mysql_core_1.date)({ mode: 'string' }).notNull(),
    photo: (0, mysql_core_1.varchar)({ length: 255 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)("created_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
    updatedAt: (0, mysql_core_1.timestamp)("updated_at", { mode: 'string' }).default((0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP`).notNull(),
});
//# sourceMappingURL=schema.js.map