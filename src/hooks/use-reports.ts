import { useState } from 'react';
import { useAuth } from '@/auth';
import type { ExpenseTagReport, ExpenseTrendReport, ReportFilterProps } from '@/types/reports';
import { fetchReportTransactions, fetchReportTrends } from '@/api/reports';

export const useReports = () => {
  const auth = useAuth()
  const [expenseTagReport, setExpenseTagReport] = useState([] as ExpenseTagReport[])
  const [expenseTrendReport, setExpenseTrendReport] = useState([] as ExpenseTrendReport[])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const asyncFetchReportTransactions = async (filters?: ReportFilterProps) => {
    setIsLoading(true)
    await fetchReportTransactions(auth.accessToken, filters)
    .then((response) => {
      setExpenseTagReport(response.items?.map((item: ExpenseTagReport) => {
        return {
          ...item,
          tag: item.tag ?? {
            id: 0,
            value: "Untagged",
            user_id: 0,
          }
        }
      }) ?? [])
    })
    .catch((error) => {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const asyncFetchReportTrends = async (filters?: ReportFilterProps) => {
    setIsLoading(true)
    await fetchReportTrends(auth.accessToken, filters)
    .then((response) => {
      setExpenseTrendReport(response.items?.map((item: ExpenseTrendReport) => {
        return {
          ...item,
          INCOME: item.INCOME - item.TRANSFER,
          EXPENSE: item.EXPENSE * -1
        }
      }) ?? [])
    })
    .catch((error) => {
      setError(error instanceof Error ? error.message : 'An unknown error occurred')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  return {
    asyncFetchReportTransactions,
    asyncFetchReportTrends,
    expenseTagReport,
    expenseTrendReport,
    isLoading,
    error,
  }

}
