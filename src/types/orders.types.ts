import { orders } from "@/db/schema"


export type OrderType = typeof orders.$inferSelect;