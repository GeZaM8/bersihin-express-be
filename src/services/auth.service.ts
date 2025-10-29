import jwt from "jsonwebtoken";
import { Request } from "express";
import bcrypt from "bcrypt";
import { LoginRequest } from "@/types/auth.types";
import { db } from "@/db";
import { roles, users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import type { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN: StringValue =
	(process.env.JWT_EXPIRESS_IN as StringValue) || "7d";

export class AuthService {
	static async verifyToken(token: string) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET) as Request["user"];
			return decoded;
		} catch {
			throw new Error("Token tidak valid");
		}
	}

	static async generateToken(payload: Request["user"]) {
		const token = jwt.sign(payload, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});
		return token;
	}

	static async login(data: LoginRequest) {
		const [user] = await db
			.select()
			.from(users)
			.leftJoin(roles, eq(users.idRole, roles.id))
			.where(
				or(eq(users.username, data.username), eq(users.email, data.username))
			).limit(1);

		if (!user) throw new Error("Username/email atau Password salah");

		const isValid = await bcrypt.compare(data.password, user.users.password);
		if (!isValid) throw new Error("Username/email atau Password salah");

		const jwt = this.generateToken({
			id: user.users.id,
			email: user.users.email,
			role: user.roles?.name ?? "",
		});
	}

	// static async register(data: RegisterRequest) {}
}
