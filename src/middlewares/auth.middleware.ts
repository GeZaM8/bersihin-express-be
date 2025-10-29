import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token akses diperlukan" });
    }

    const decoded = await AuthService.verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

