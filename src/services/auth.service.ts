import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { LoginRequest, RegisterRequest, UserType } from "@/types/auth.types";
import { db } from "@/db";
import { roles, userDetails, users } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import type { StringValue } from "ms";
import { ApiError } from "@/helpers/ApiError";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN: StringValue =
	(process.env.JWT_EXPIRESS_IN as StringValue) || "7d";

export class AuthService {
	static async verifyToken(token: string) {
		try {
			const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
				id: number;
				email: string;
				role: string;
			};
			return decoded;
		} catch {
			throw new Error("Token tidak valid");
		}
	}

	static async generateToken(
		payload: JwtPayload & {
			id: number;
			email: string;
			role: string;
		}
	) {
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
			)
			.limit(1);

		if (!user) throw new ApiError(400, "Username/email atau Password salah");

		const isValid = await bcrypt.compare(data.password, user.users.password);
		if (!isValid) throw new ApiError(400, "Username/email atau Password salah");

		const jwt = await this.generateToken({
			id: user.users.id,
			email: user.users.email,
			role: user.roles?.name ?? "",
		});

		return {
			token: jwt,
			user: {
				id: user.users.id,
				username: user.users.username,
				email: user.users.email,
				idRole: user.users.idRole,
			} as UserType,
		};
	}

	static async register(data: RegisterRequest) {
		const isEmailExist = await db.query.users.findFirst({
			where: eq(users.email, data.email),
		});
		if (isEmailExist) throw new ApiError(409, "Email sudah terdaftar");

		const isUsernameExist = await db.query.users.findFirst({
			where: eq(users.username, data.username),
		});
		if (isUsernameExist) throw new ApiError(409, "Username sudah terdaftar");

		const hashedPassword = await bcrypt.hash(
			data.password,
			process.env.HASH_OR_ROUNDS || 10
		);

		const result = await db.transaction(async (tx) => {
			const resultUser = await tx
				.insert(users)
				.values({
					email: data.email,
					username: data.username,
					password: hashedPassword,
					idRole: 4,
				})
				.execute();

			if (!resultUser) throw new ApiError(500, "Insert user gagal");

			const resultUserDetail = await tx
				.insert(userDetails)
				.values({
					userId: resultUser[0].insertId,
					name: data.name,
					address: data.address,
					birth: data.birth,
					phone: data.phone,
					photo: data.photo,
				})
				.execute();

			if (!resultUserDetail)
				throw new ApiError(500, "Insert user detail gagal");

			return {
				userId: resultUser[0].insertId,
			};
		});

		return { id_user: result.userId };
	}
}
