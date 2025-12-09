"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const ApiError_1 = require("../helpers/ApiError");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRESS_IN || "7d";
class AuthService {
    static async verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return decoded;
        }
        catch {
            throw new Error("Token tidak valid");
        }
    }
    static async generateToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        return token;
    }
    static async login(data) {
        const [user] = await db_1.db
            .select()
            .from(schema_1.users)
            .leftJoin(schema_1.roles, (0, drizzle_orm_1.eq)(schema_1.users.idRole, schema_1.roles.id))
            .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(schema_1.users.username, data.username), (0, drizzle_orm_1.eq)(schema_1.users.email, data.username)))
            .limit(1);
        if (!user)
            throw new ApiError_1.ApiError(400, "Username/email atau Password salah");
        const isValid = await bcrypt_1.default.compare(data.password, user.users.password);
        if (!isValid)
            throw new ApiError_1.ApiError(400, "Username/email atau Password salah");
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
            },
        };
    }
    static async register(data) {
        const isEmailExist = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.email, data.email),
        });
        if (isEmailExist)
            throw new ApiError_1.ApiError(409, "Email sudah terdaftar");
        const isUsernameExist = await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.users.username, data.username),
        });
        if (isUsernameExist)
            throw new ApiError_1.ApiError(409, "Username sudah terdaftar");
        const hashedPassword = await bcrypt_1.default.hash(data.password, process.env.HASH_OR_ROUNDS || 10);
        const result = await db_1.db.transaction(async (tx) => {
            const resultUser = await tx
                .insert(schema_1.users)
                .values({
                email: data.email,
                username: data.username,
                password: hashedPassword,
                idRole: 4,
            })
                .execute();
            if (!resultUser)
                throw new ApiError_1.ApiError(500, "Insert user gagal");
            const resultUserDetail = await tx
                .insert(schema_1.userDetails)
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
                throw new ApiError_1.ApiError(500, "Insert user detail gagal");
            return {
                userId: resultUser[0].insertId,
            };
        });
        return { id_user: result.userId };
    }
    static async updateProfile(idUser, data) {
        const [user] = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, idUser))
            .limit(1);
        if (!user)
            throw new ApiError_1.ApiError(404, "User tidak ditemukan");
        const result = await db_1.db.transaction(async (tx) => {
            const resultUser = await tx
                .update(schema_1.users)
                .set(data)
                .where((0, drizzle_orm_1.eq)(schema_1.users.id, idUser))
                .execute();
            if (!resultUser)
                throw new ApiError_1.ApiError(500, "Update user gagal");
            const resultUserDetail = await tx
                .update(schema_1.userDetails)
                .set(data)
                .where((0, drizzle_orm_1.eq)(schema_1.userDetails.userId, idUser))
                .execute();
            if (!resultUserDetail)
                throw new ApiError_1.ApiError(500, "Update user detail gagal");
            return user;
        });
        return result;
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map