import { useState } from "react"
import { Loader2 } from "lucide-react"
import { ExpensesCategoryInsight } from "@/components/transactions/insights/expenses-category-insight"
import { ExpenseTrendInsights } from "@/components/transactions/insights/expenses-trend-insight"
import type { ExpenseTagReport, ExpenseTrendReport } from "@/types/reports"
import type { Tag } from "@/types/tags"

interface ExpensesInsightsProps {
  isLoading: boolean
  expenseTagReport: ExpenseTagReport[]
  expenseTrendReport: ExpenseTrendReport[]
  addTagFilter: (tag: Tag) => void
  removeTagFilter: () => void
}

export function ExpensesInsights({ 
  isLoading, 
  expenseTagReport, 
  expenseTrendReport,
  addTagFilter,
  removeTagFilter
}: ExpensesInsightsProps) {

  const [currentFilteredTag, setCurrentFilteredTag] = useState<Tag | undefined>()

  const handleTagFilter = (tag: Tag) => {
    addTagFilter(tag)
    setCurrentFilteredTag(tag)
  }

  const handleRemoveTagFilter = () => {
    removeTagFilter()
    setCurrentFilteredTag(undefined)
  }

  return (
    <div className="grid lg:grid-cols-3 xs:grid-cols-1 gap-4 px-4 lg:px-6">
      {isLoading ? 
        (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <div>
              <ExpensesCategoryInsight
                data={expenseTagReport}
                addTagFilter={handleTagFilter}
                removeTagFilter={handleRemoveTagFilter}
                currentFilteredTag={currentFilteredTag}
              />
            </div>
            <div className="col-span-2">
              <ExpenseTrendInsights data={expenseTrendReport} />
            </div>
          </>
        )
      }
    </div>
  )
}
