import { z } from 'zod'

export const AccountTypeEnum = z.enum([
  'CHECKING',
  'SAVINGS',
  'INVESTMENTS',
  'OTHERS',
])

export const CurrencyCodeEnum = z.enum(['EUR', 'USD', 'BRL'])

export const accountSchema = z.object({
  id: z.number().optional(),
  alias: z.string(),
  currency: CurrencyCodeEnum,
  type: AccountTypeEnum,
  user_id: z.number().optional(),
  balance: z.number().optional(),
  expenses: z.number().optional(),
  incomes: z.number().optional(),
})
