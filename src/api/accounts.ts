import axios from 'redaxios'
import type { Account } from '@/types/accounts'

interface AccountsResponse {
  accounts: Account[]
}

export const listAccounts = async (accessToken: string | null): Promise<AccountsResponse> => {
  return await axios.get<AccountsResponse>(
    'http://localhost:5000/accounts',
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to request transactions`)
  })
}

export const getAccount = async (accessToken: string | null, accountId: number): Promise<Account> => {
  return await axios.get<Account>(
    `http://localhost:5000/accounts/${accountId}`,
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to request transactions`)
  })
}

export const addAccount = async (accessToken: string | null, account: Account): Promise<Account> => {
  return await axios.post<Account>(
    `http://localhost:5000/accounts`,
    account,
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }
  ).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to request transactions`)
  })
}

export const deleteAccount = async (accessToken: string | null, accountId: number): Promise<void> => {
  return await axios.delete(`http://localhost:5000/accounts/${accountId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  }).then(res => res.data)
  .catch(() => {
    throw new Error(`Failed to request transactions`)
  })
}