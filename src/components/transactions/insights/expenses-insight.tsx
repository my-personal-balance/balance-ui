import { useEffect, useTransition } from 'react'
import { Loader2 } from 'lucide-react'
import { ExpensesCategoryInsight } from '@/components/transactions/insights/expenses-category-insight'
import { ExpenseTrendInsights } from '@/components/transactions/insights/expenses-trend-insight'
import { useReports } from '@/hooks/use-reports'
import type { TransactionFilterProps } from '@/types/transactions'

interface ExpensesInsightsProps {
  filters: TransactionFilterProps
}

export function ExpensesInsights({
  filters,
}: ExpensesInsightsProps) {

  const {
    asyncFetchReportTransactions,
    asyncFetchReportTrends,
    expenseTagReport,
    expenseTrendReport,
  } = useReports()
  const [isLoading, startTransaction] = useTransition()

  useEffect(() => {
    asyncRefreshData()
  }, [filters])

  const asyncRefreshData = async () => {
    startTransaction(async () => {
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
    })
  }

  return (
    <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-4 px-4 lg:px-6">
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div>
            <ExpensesCategoryInsight data={expenseTagReport} />
          </div>
          <div className="col-span-2">
            <ExpenseTrendInsights data={expenseTrendReport} />
          </div>
        </>
      )}
    </div>
  )
}
