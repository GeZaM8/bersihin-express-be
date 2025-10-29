import { Response } from "express";

export const notFound = (res: Response, message = "Tidak Ditemukan") =>
	res.status(404).json({
		success: false,
		message,
	});

export const badRequest = (res: Response, message: string) =>
	res.status(400).json({
		success: false,
		message,
	});

export const ok = (res: Response, message = "Berhasil", data: any) =>
	res.status(200).json({
		success: true,
		message,
		data,
	});
