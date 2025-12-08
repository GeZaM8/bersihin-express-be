"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.created = exports.ok = exports.badRequest = exports.notFound = void 0;
const notFound = (res, message = "Tidak Ditemukan") => res.status(404).json({
    success: false,
    message,
});
exports.notFound = notFound;
const badRequest = (res, message) => res.status(400).json({
    success: false,
    message,
});
exports.badRequest = badRequest;
const ok = (res, message = "Berhasil", data) => res.status(200).json({
    success: true,
    message,
    data,
});
exports.ok = ok;
const created = (res, message = "Berhasil", data) => res.status(201).json({
    success: true,
    message,
    data,
});
exports.created = created;
//# sourceMappingURL=httpResponse.helper.js.map