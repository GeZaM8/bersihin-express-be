import { badRequest, ok } from "@/helpers/httpResponse.helper";
import { asyncHandler } from "@/middlewares/asyncHandler";
import { AuthService } from "@/services/auth.service";
import { LoginRequest } from "@/types/auth.types";


export class AuthController {
  static login = asyncHandler(async (req, res) => {
    const { username, password }: LoginRequest = req.body;

    if (!username || !password) {
      return badRequest(res, "Username/email dan password harus diisi");
    }

    const result = AuthService.login({ username, password });

    ok(res, "Login berhasil", result);
  });
}