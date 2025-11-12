import type { UserPayload } from "../auth.types";

export {};

declare global {
	namespace Express {
		interface Request {
			user: UserPayload;
		}
	}
}
