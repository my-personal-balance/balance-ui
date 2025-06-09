import { z } from "zod"
import type { CurrencyCodeEnum } from "@/types/schemas/accounts-schema"

type CurrencyCode = z.infer<typeof CurrencyCodeEnum>

export type Account = {
  id?: number,
  alias: string,
  user_id?: number,
  type: string,
  currency: CurrencyCode,
  
  balance?: number,
  incomes?: number,
  expenses?: number,
}