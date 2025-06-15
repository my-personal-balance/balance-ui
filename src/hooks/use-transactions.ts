import { useState } from 'react';

import { addTransaction, deleteTransaction, listTransactions, updateTransaction, updateTransactions, uploadTransactions } from '@/api/transactions';
import type { TransactionFilterProps } from "@/types/transactions"
import type { Transaction } from '@/types/transactions';
import { useAuth } from '@/auth';

export const useTransactions = () => {
  const auth = useAuth()
  const [transactions, setTransactions] = useState([] as Transaction[])

  const refreshTransactions = async (filters?: TransactionFilterProps) => {
    const response = await listTransactions(auth.accessToken, filters)
    setTransactions(response.transactions);
  }

  return {
    transactions,
    refreshTransactions,
  }
}

export const useEditTransactions = () => {
  const auth = useAuth()
  const [error, setError] = useState<string | null>(null)

  const asyncAddTransaction = async (transaction: Transaction) => {
    try {
      await addTransaction(auth.accessToken, transaction)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const asyncUploadTransaction = async (accountId: number, file: File) => {
    try {
      await uploadTransactions(auth.accessToken, accountId, file)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const asyncDeleteTransaction = async (transactionId: number) => {
    try {
      await deleteTransaction(auth.accessToken, transactionId)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const asyncUpdateTransaction = async (transactionId: number, transaction: Transaction): Promise<Transaction | null> => {
    try {
      return await updateTransaction(auth.accessToken, transactionId, transaction)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
    return null
  }

  const asyncUpdateTransactions = async (transactions: Transaction[]) => {
    try {
      await updateTransactions(auth.accessToken, transactions)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  return {
    asyncAddTransaction,
    asyncUploadTransaction,
    asyncDeleteTransaction,
    asyncUpdateTransaction,
    asyncUpdateTransactions,
    error,
  }
}
