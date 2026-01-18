import axios from 'redaxios'
import type { TransactionClassificationResponse } from '@/types/classify'

export const autoClassify = async (
  accessToken: string | null,
  transactionIds: number[]
): Promise<TransactionClassificationResponse[]> => {
  return await axios
    .post<TransactionClassificationResponse[]>(`http://localhost:5000/auto-classify/classify-transactions`, { transactions: transactionIds }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to request transactions`)
    })
}