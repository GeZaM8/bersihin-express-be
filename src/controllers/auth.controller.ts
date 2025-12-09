import { badRequest, created, ok } from "@/helpers/httpResponse.helper";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { AuthService } from "@/services/auth.service";
import { LoginRequest, RegisterRequest } from "@/types/auth.types";
import { Request, Response } from "express";

export class AuthController {
  static login = asyncHandler(async (req: Request, res: Response) => {
    const { username, password }: LoginRequest = req.body;

    if (!username || !password) {
      return badRequest(res, "Username/email dan password harus diisi");
    }

    const result = await AuthService.login({ username, password });

    ok(res, "Login berhasil", result);
  });

  static register = asyncHandler(async (req: Request, res: Response) => {
    const {
      name,
      email,
      username,
      phone,
      photo,
      address,
      birth,
      password,
    }: RegisterRequest = req.body;

    if (
      !name ||
      !email ||
      !username ||
      !phone ||
      !address ||
      !birth ||
      !password
    ) {
      return badRequest(res, "Semua field harus diisi");
    }

    if (password.length < 8) {
      return badRequest(res, "Password minimal 8 karakter");
    }

    const result = await AuthService.register({
      name,
      email,
      username,
      phone,
      photo,
      address,
      birth,
      password,
    });

    created(res, "Register berhasil", result);
  });

  static getProfile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user;

    const result = await AuthService.getProfile(Number(id));

    ok(res, "Get profile berhasil", result);
  });

  static updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.user;
    const data = req.body;

    const result = await AuthService.updateProfile(Number(id), data);

    ok(res, "Update profile berhasil", result);
  });
}
