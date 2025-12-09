import "dotenv/config";
import * as schema from "../db/schema";
export declare const db: import("drizzle-orm/mysql2").MySql2Database<typeof schema> & {
    $client: import("mysql2/promise").Pool;
};
//# sourceMappingURL=index.d.ts.map