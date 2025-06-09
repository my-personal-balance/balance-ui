import { useState, useEffect } from 'react';

import { listAccounts, deleteAccount, addAccount } from '@/api/accounts';
import type { Account } from '@/types/accounts';
import { useAuth } from '@/auth';

export const useAccounts = () => {
  const auth = useAuth()
  const [accounts, setAccounts] = useState([] as Account[])

  useEffect(() => {
    refreshAccounts()
  },[auth.accessToken])

  const refreshAccounts = async () => {
    const response = await listAccounts(auth.accessToken)
    setAccounts(response.accounts)
  }

  const asyncDeleteAccount = async (accountId: number) => {
    await deleteAccount(auth.accessToken, accountId)
    refreshAccounts()
  }

  const asyncAddAccount = async (account: Account) => {
    await addAccount(auth.accessToken, account)
    refreshAccounts()
  }

  return {
    accounts,
    refreshAccounts,
    asyncAddAccount,
    asyncDeleteAccount,
  }
}
