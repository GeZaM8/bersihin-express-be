import { userDetails, users } from "@/db/schema";
import { InferModel } from "drizzle-orm";

export type UserType = typeof users.$inferSelect;
export type UserDetailType = typeof userDetails.$inferSelect;

export interface LoginRequest {
	username: string;
	password: string;
}

export interface RegisterRequest
	extends Omit<UserType, "createdAt" | "updatedAt" | "id" | "idRole">,
		Omit<UserDetailType, "createdAt" | "updatedAt" | "id" | "userId"> {
			confirmPassword: string
		}
