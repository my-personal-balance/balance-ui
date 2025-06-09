import axios from 'redaxios'
import type { TransactionFilterProps } from "@/types/transactions"
import { paramsToSnakeCase } from '@/lib/utils'
import type { Balance } from '@/types/balance'

export const getBalance = async (accessToken: string | null, filters?: TransactionFilterProps): Promise<Balance> => {
  return await axios.get<Balance>(
    'http://localhost:5000/balance',
    {
      params: filters && paramsToSnakeCase(filters),
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to request transactions`)
  })
}