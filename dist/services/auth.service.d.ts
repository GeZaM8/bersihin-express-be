import { LoginRequest, RegisterRequest, UserPayload, UserType } from "../types/auth.types";
export declare class AuthService {
    static verifyToken(token: string): Promise<UserPayload>;
    static generateToken(payload: UserPayload): Promise<string>;
    static login(data: LoginRequest): Promise<{
        token: string;
        user: UserType;
    }>;
    static register(data: RegisterRequest): Promise<{
        id_user: number;
    }>;
    static updateProfile(idUser: number, data: Partial<RegisterRequest>): Promise<{
        id: number;
        email: string;
        username: string;
        password: string;
        idRole: number;
        createdAt: string;
        updatedAt: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map