import { Request, Response } from "express";
export declare class OrderController {
    static getMyOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getMyOrderById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static createOrder: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static deleteOrderById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static updateOrderStatusToConfirmed: (req: Request, res: Response, next: import("express").NextFunction) => void;
    static getAllOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=orders.controller.d.ts.map