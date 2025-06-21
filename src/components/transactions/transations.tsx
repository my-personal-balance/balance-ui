import { useEffect, useState, useTransition as useTransitionReact } from "react"
import { format} from "date-fns"
import type { DateRange } from "react-day-picker"

import type { TransactionFilterProps } from "@/types/transactions"
import { useTransactions } from "@/hooks/use-transactions"
import { useBalance } from "@/hooks/use-balance"
import { BalanceInfo } from "@/components/balance/balance-info"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { AddTransaction } from "@/components/transactions/add-transactions"
import { UploadTransactions } from "@/components/transactions/upload-transactions"
import { DataTable } from "@/components/transactions/data-table/data-table"
import { ExpensesInsights } from "@/components/transactions/insights/expenses-insight"
import { AccountsActions } from "@/components/accounts/accounts-actions"
import { useTags } from "@/hooks/use-tags"
import { useAccounts } from "@/hooks/use-accounts"
import { useReports } from "@/hooks/use-reports"
import type { Tag } from "@/types/tags"

export function Transactions({ title, accountId, showInsights = false }: { title: string, accountId?: number, showInsights?: boolean }) {

  const [filters, setFilters] = useState<TransactionFilterProps>(accountId ? {accountId} : {} as TransactionFilterProps)
  const { transactions, refreshTransactions } = useTransactions()
  const { balance, refreshBalance } = useBalance()
  const { accounts, refreshAccounts } = useAccounts()
  const { tags } = useTags()
  const { asyncFetchReportTransactions, asyncFetchReportTrends, expenseTagReport, expenseTrendReport } = useReports()
  const [isLoading, startTransition] = useTransitionReact()

  useEffect(() => {
    refreshAccounts()
    asyncRefreshTransactions()
  }, [filters])

  const asyncRefreshTransactions = async () => {
    startTransition(async () => {
      await refreshTransactions(filters)
      await refreshBalance(filters)
      if (showInsights) {
        await asyncFetchReportTransactions({
          ...filters,
          periodType: filters.periodType || 'current_month',
          reportType: 'group_by_tag',
        })
        await asyncFetchReportTrends({
          ...filters,
          periodType: filters.periodType || 'current_month',
          reportType: 'group_by_tag',
        })
      }
    })
  }

  const handleDateChange = (date: DateRange) => {
    const dateRange = date as DateRange
    if (dateRange?.from && dateRange?.to) {
      setFilters({
        ...filters,
        startDate: dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
        endDate: dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
        periodType: 'custom'
      })
    }
  }

  const addTagFilter = (tag: Tag) => {
    setFilters({ ...filters, tagId: tag.id })
  }

  const removeTagFilter = () => {
    const newFilters = { ...filters }
    delete newFilters.tagId
    setFilters(newFilters)
  }
  
  return (
    <>
      <div className="flex justify-between sm:grid sm:grid-cols-2">
        <div className="items-center space-y-2 px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {accountId && <AccountsActions accountId={accountId} />}
          </div>
        </div>
        <div className="flex justify-end gap-2 sm:px-4 md:px-4 lg:px-6">
          <DatePickerWithRange onChange={(date) => date && handleDateChange(date as DateRange)}/>
          <AddTransaction
            accountId={accountId}
            accounts={accounts}
            tags={tags}
            onChange={asyncRefreshTransactions}
          />
          <UploadTransactions
            accountId={accountId}
            accounts={accounts}
            onChange={asyncRefreshTransactions}
          />
        </div>
      </div>
      <BalanceInfo balance={balance} />
      {showInsights && 
        <ExpensesInsights
          isLoading={isLoading}
          expenseTagReport={expenseTagReport}
          expenseTrendReport={expenseTrendReport}
          addTagFilter={addTagFilter}
          removeTagFilter={removeTagFilter}
        />
      }
      <div className="px-4 lg:px-6">
        <DataTable
          data={transactions}
          onChange={asyncRefreshTransactions}
          tags={tags}
          accounts={accounts}
        />
      </div>
    </>
  )
}