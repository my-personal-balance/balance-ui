import axios from 'redaxios'
import { paramsToSnakeCase } from '@/lib/utils'
import type { Transaction, TransactionFilterProps } from '@/types/transactions'

type ListTransactionsReponse = {
  transactions: Transaction[]
}

export const listTransactions = async (
  accessToken: string | null,
  filters?: TransactionFilterProps
): Promise<ListTransactionsReponse> => {
  return await axios
    .get<ListTransactionsReponse>('http://localhost:5000/transactions', {
      params: filters && paramsToSnakeCase(filters),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to request transactions`)
    })
}

export const addTransaction = async (
  accessToken: string | null,
  transaction?: Transaction
): Promise<Transaction> => {
  return await axios
    .post<Transaction>('http://localhost:5000/transactions', transaction, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to add transaction`)
    })
}

export const updateTransaction = async (
  accessToken: string | null,
  transactionId: number,
  transaction?: Transaction
): Promise<Transaction> => {
  return await axios
    .put<Transaction>(
      `http://localhost:5000/transactions/${transactionId}`,
      transaction,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to update transaction`)
    })
}

export const updateTransactions = async (
  accessToken: string | null,
  transactions?: Transaction[]
): Promise<Transaction> => {
  return await axios
    .patch<Transaction>(
      'http://localhost:5000/transactions',
      { transactions: transactions },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to update transaction`)
    })
}

export const deleteTransaction = async (
  accessToken: string | null,
  transactionId: number
): Promise<void> => {
  return await axios
    .delete(`http://localhost:5000/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to delete transaction`)
    })
}

export const uploadTransactions = async (
  accessToken: string | null,
  accountId: number,
  file: File
): Promise<void> => {
  const formData = new FormData()
  formData.append('account_id', accountId.toString())
  formData.append('file', file)

  return await axios
    .post(`http://localhost:5000/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to delete transaction`)
    })
}
