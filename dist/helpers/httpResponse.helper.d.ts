import { Response } from "express";
export declare const notFound: (res: Response, message?: string) => Response<any, Record<string, any>>;
export declare const badRequest: (res: Response, message: string) => Response<any, Record<string, any>>;
export declare const ok: (res: Response, message: string | undefined, data: any) => Response<any, Record<string, any>>;
export declare const created: (res: Response, message: string | undefined, data: any) => Response<any, Record<string, any>>;
//# sourceMappingURL=httpResponse.helper.d.ts.map