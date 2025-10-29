import { relations } from "drizzle-orm/relations";
import { orders, comments, orderDetails, taskLists, users, roles, userDetails } from "./schema";

export const commentsRelations = relations(comments, ({one}) => ({
	order: one(orders, {
		fields: [comments.idOrder],
		references: [orders.id]
	}),
}));

export const ordersRelations = relations(orders, ({many}) => ({
	comments: many(comments),
	orderDetails: many(orderDetails),
}));

export const orderDetailsRelations = relations(orderDetails, ({one}) => ({
	order: one(orders, {
		fields: [orderDetails.idOrder],
		references: [orders.id]
	}),
	taskList: one(taskLists, {
		fields: [orderDetails.idTasks],
		references: [taskLists.id]
	}),
	user: one(users, {
		fields: [orderDetails.idUser],
		references: [users.id]
	}),
}));

export const taskListsRelations = relations(taskLists, ({many}) => ({
	orderDetails: many(orderDetails),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	orderDetails: many(orderDetails),
	role: one(roles, {
		fields: [users.idRole],
		references: [roles.id]
	}),
	userDetails: many(userDetails),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users: many(users),
}));

export const userDetailsRelations = relations(userDetails, ({one}) => ({
	user: one(users, {
		fields: [userDetails.id],
		references: [users.id]
	}),
}));