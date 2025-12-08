import { userDetails, users } from "@/db/schema";
import { JwtPayload } from "jsonwebtoken";
export type UserPayload = JwtPayload & {
    id: number;
    email: string;
    role: string;
};
export type UserType = typeof users.$inferSelect;
export type UserDetailType = typeof userDetails.$inferSelect;
export interface LoginRequest {
    username: string;
    password: string;
}
export interface RegisterRequest extends Omit<UserType, "createdAt" | "updatedAt" | "id" | "idRole">, Omit<UserDetailType, "createdAt" | "updatedAt" | "id" | "userId"> {
}
//# sourceMappingURL=auth.types.d.ts.map