import { useState } from "react"

import { getBalance } from "@/api/balance"
import { useAuth } from "@/auth"
import type { Balance } from "@/types/balance"
import type { TransactionFilterProps } from "@/types/transactions"

export const useBalance = () => {
  const auth = useAuth()
  const [balance, setBalance] = useState<Balance>({
    balance: 0.0,
    incomes: 0.0,
    expenses: 0.0
  })

  const refreshBalance = async (filters?: TransactionFilterProps) => {
    const response = await getBalance(auth.accessToken, filters)
    setBalance(response);
  }

  return {
    balance,
    refreshBalance,
  }
}