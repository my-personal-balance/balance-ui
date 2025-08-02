import { useState } from 'react'
import { useAuth } from '@/auth'
import { listAccounts, deleteAccount, addAccount } from '@/api/accounts'
import type { Account } from '@/types/accounts'

export const useAccounts = () => {
  const auth = useAuth()
  const [accounts, setAccounts] = useState([] as Account[])

  const refreshAccounts = async () => {
    const response = await listAccounts(auth.accessToken)
    setAccounts(response.accounts)
  }

  const asyncDeleteAccount = async (accountId: number) => {
    await deleteAccount(auth.accessToken, accountId)
  }

  const asyncAddAccount = async (account: Account) => {
    await addAccount(auth.accessToken, account)
  }

  return {
    accounts,
    refreshAccounts,
    asyncAddAccount,
    asyncDeleteAccount,
  }
}
