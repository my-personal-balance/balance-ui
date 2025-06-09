import axios from 'redaxios'
import type { SplitTransaction } from '@/types/split-transaction';

export const setSplitTransaction = async (
  accessToken: string | null,
  transactionId: number,
  splitTransactions: SplitTransaction[]
): Promise<SplitTransaction[]> => {
  return await axios.post<SplitTransaction[]>(
    `http://localhost:5000/transactions/${transactionId}/split`,
    { transactions: splitTransactions },
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to set split transaction`)
  })
}