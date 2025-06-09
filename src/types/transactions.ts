import { z } from "zod"
import type { transactionSchema } from "@/components/transactions/data-table/data/schema"
import type { ReportType } from "@/types/reports"

export type Transaction = z.infer<typeof transactionSchema>

export type TransactionFilterProps = {
  accountId?: number
  tagId?: number
  periodType?: 'custom' | 'current_month' | 'last_month' | 'current_year' | 'last_year' | 'last_3_months' | 'last_6_months' | 'last_12_months'
  periodOffset?: number
  startDate?: string
  endDate?: string
  reportType?: ReportType
}