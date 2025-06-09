import { z } from "zod"
import { splitTransactionSchema } from "@/types/schemas/split-transaction-schema"

export type SplitTransaction = z.infer<typeof splitTransactionSchema>