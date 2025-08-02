import { useState } from 'react'
import { useAuth } from '@/auth'
import { setSplitTransaction } from '@/api/split-transactions'
import type { SplitTransaction } from '@/types/split-transaction'

export const useSplitTransactions = () => {
  const auth = useAuth()
  const [error, setError] = useState<string | null>(null)

  const asyncSetSplitTransactions = async (
    transactionId: number,
    splitTransactions: SplitTransaction[]
  ) => {
    try {
      await setSplitTransaction(
        auth.accessToken,
        transactionId,
        splitTransactions
      )
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      )
    }
  }

  return {
    asyncSetSplitTransactions,
    error,
  }
}
