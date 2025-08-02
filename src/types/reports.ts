import type { Tag } from '@/types/tags'
import type { TransactionFilterProps } from '@/types/transactions'

export type ReportType = 'group_by_tag'

export type ReportFilterProps = TransactionFilterProps & {
  reportType?: ReportType
}

export type ExpenseTagReport = {
  EXPENSE: number
  INCOME: number
  TRANSFER: number
  tag: Tag
}

export type ExpenseTrendReport = {
  EXPENSE: number
  INCOME: number
  TRANSFER: number
  month: string
}
