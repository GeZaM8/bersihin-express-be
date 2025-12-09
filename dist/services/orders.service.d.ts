import { UserPayload } from "../types/auth.types";
import { OrderRequest } from "../types/orders.types";
export declare class OrderService {
    static getMyOrders(user: UserPayload): Promise<{
        orders: {
            id: number;
            idUser: number;
            name: string;
            message: string | null;
            weight: number;
            estimatedTime: string;
            rating: number;
            statusConfirmed: "confirmed" | "pending" | "rejected";
            isCompleted: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    static getMyOrderById(user: UserPayload, id: number): Promise<{
        order: {
            id: number;
            idUser: number;
            name: string;
            message: string | null;
            weight: number;
            estimatedTime: string;
            rating: number;
            statusConfirmed: "confirmed" | "pending" | "rejected";
            isCompleted: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    static createOrder(data: OrderRequest, user: UserPayload): Promise<{
        orderId: number;
    }>;
    static deleteOrderById(id: number, user: UserPayload): Promise<{
        order: {
            id: number;
            idUser: number;
            name: string;
            message: string | null;
            weight: number;
            estimatedTime: string;
            rating: number;
            statusConfirmed: "confirmed" | "pending" | "rejected";
            isCompleted: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    static getAllOrders(): Promise<{
        orders: {
            id: number;
            idUser: number;
            name: string;
            message: string | null;
            weight: number;
            estimatedTime: string;
            rating: number;
            statusConfirmed: "confirmed" | "pending" | "rejected";
            isCompleted: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
    static updateOrderStatusToConfirmed(id: number, user: UserPayload): Promise<{
        order: {
            id: number;
            idUser: number;
            name: string;
            message: string | null;
            weight: number;
            estimatedTime: string;
            rating: number;
            statusConfirmed: "confirmed" | "pending" | "rejected";
            isCompleted: string;
            createdAt: string;
            updatedAt: string;
        }[];
    }>;
}
//# sourceMappingURL=orders.service.d.ts.map