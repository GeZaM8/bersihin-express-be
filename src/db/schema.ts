import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, foreignKey, int, varchar, timestamp, text, float, datetime, mysqlEnum, tinytext, date } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const comments = mysqlTable("comments", {
	id: int().autoincrement().notNull().primaryKey(),
	idOrder: int("id_order").notNull().references(() => orders.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	title: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	photo: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => [
	index("id_order").on(table.idOrder),
]);

export const orders = mysqlTable("orders", {
	id: int().autoincrement().notNull().primaryKey(),
	idUser: int("id_user").notNull().references(() => users.id),
	name: varchar({ length: 255 }).notNull(),
	message: text().default('NULL'),
	weight: float().notNull(),
	estimatedTime: datetime("estimated_time", { mode: 'string'}).notNull(),
	rating: int().notNull(),
	statusConfirmed: mysqlEnum("status_confirmed", ['confirmed','pending','rejected']).notNull(),
	isCompleted: tinytext("is_completed").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const orderDetails = mysqlTable("order_details", {
	id: int().autoincrement().notNull().primaryKey(),
	idOrder: int("id_order").notNull().references(() => orders.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	idTasks: int("id_tasks").notNull().references(() => taskLists.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	idUser: int("id_user").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	isCompleted: tinytext("is_completed").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => [
	index("id_order").on(table.idOrder),
	index("id_tasks").on(table.idTasks),
]);

export const roles = mysqlTable("roles", {
	id: int().autoincrement().notNull().primaryKey(),
	name: varchar({ length: 10 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const taskLists = mysqlTable("task_lists", {
	id: int().autoincrement().notNull().primaryKey(),
	name: varchar({ length: 100 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	price: int().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const users = mysqlTable("users", {
	id: int().autoincrement().notNull().primaryKey(),
	email: varchar({ length: 100 }).notNull(),
	username: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	idRole: int("id_role").notNull().references(() => roles.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
},
(table) => [
	index("id_role").on(table.idRole),
]);

export const userDetails = mysqlTable("user_details", {
	id: int().autoincrement().notNull().primaryKey(),
	userId: int("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar({ length: 100 }).notNull(),
	address: text().notNull(),
	phone: varchar({ length: 16 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	birth: date({ mode: 'string' }).notNull(),
	photo: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});
