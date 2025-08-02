import axios from 'redaxios'
import { paramsToSnakeCase } from '@/lib/utils'
import type { ListReponse } from '@/api/common'
import type {
  ExpenseTagReport,
  ExpenseTrendReport,
  ReportFilterProps,
} from '@/types/reports'

export const fetchReportTransactions = async (
  accessToken: string | null,
  filters?: ReportFilterProps
): Promise<ListReponse<ExpenseTagReport>> => {
  return await axios
    .get<ListReponse<ExpenseTagReport>>(
      'http://localhost:5000/reports/transactions',
      {
        params: filters && paramsToSnakeCase(filters),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to request user`)
    })
}

export const fetchReportTrends = async (
  accessToken: string | null,
  filters?: ReportFilterProps
): Promise<ListReponse<ExpenseTrendReport>> => {
  return await axios
    .get<ListReponse<ExpenseTrendReport>>(
      'http://localhost:5000/reports/trends',
      {
        params: filters && paramsToSnakeCase(filters),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => res.data)
    .catch(() => {
      throw new Error(`Failed to request user`)
    })
}
