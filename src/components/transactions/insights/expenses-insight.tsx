import { useEffect, useState, useTransition } from "react"
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis, YAxis } from "recharts"
import { Link } from "@tanstack/react-router"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useReports } from "@/hooks/use-reports"

import type { ExpenseTagReport, ExpenseTrendReport, ReportFilterProps } from "@/types/reports"
import { formatNumber } from "@/lib/utils"
import type { Tag } from "@/types/tags"
import { badgeVariants } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

export function ExpensesInsights({ filters, setFilters }: { filters: ReportFilterProps, setFilters: (filters: ReportFilterProps) => void }) {

  const { asyncFetchReportTransactions, asyncFetchReportTrends, expenseTagReport, expenseTrendReport } = useReports()
  const [isLoading, startTransition] = useTransition()
  const [currentFilteredTag, setCurrentFilteredTag] = useState<Tag | undefined>()

  useEffect(() => {
    startTransition(async () => {
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
  }, [filters])

  const addTagFilter = (tag: Tag) => {
    setCurrentFilteredTag(tag)
    setFilters({ ...filters, tagId: tag.id })
  }

  const removeTagFilter = () => {
    setCurrentFilteredTag(undefined)
    const newFilters = { ...filters }
    delete newFilters.tagId
    setFilters(newFilters)
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
              <ExpensesCategoryInsight data={expenseTagReport} addTagFilter={addTagFilter} removeTagFilter={removeTagFilter} currentFilteredTag={currentFilteredTag}/>
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

export function ExpensesCategoryInsight({ 
  data,
  addTagFilter,
  removeTagFilter,
  currentFilteredTag 
}: { data: ExpenseTagReport[], addTagFilter: (tag: Tag) => void, removeTagFilter: () => void, currentFilteredTag: Tag | undefined }) {
  
  const [totalExpenses, setTotalExpenses] = useState(0.0)
  const [chartData, _] = useState(data.map((item) => ({
    ...item,
    fill: getRandomColor()
  })))

  useEffect(() => {
    setTotalExpenses(data.reduce((acc, curr) => acc + curr.EXPENSE, 0))
  }, [data])

  const chartConfig = {
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses</CardTitle>
        {currentFilteredTag && (
          <CardDescription className="flex justify-center">
            <Link onClick={() => removeTagFilter()} to="." className={badgeVariants({ variant: "outline" })}>{currentFilteredTag.value}</Link>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-dvh"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-2xs"
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="EXPENSE"
              nameKey="tag.value"
              paddingAngle={1}
              innerRadius={120}
              strokeWidth={15}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {formatNumber(totalExpenses, {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=" text-xs">
        <div className="grid grid-cols-2 items-center gap-1 leading-none font-medium w-full">
          {data.map((item) => (
          <>
            <div className="border-b-2 pt-2 pb-2" onClick={() => addTagFilter(item.tag)}>{item.tag.value}</div>
            <div className="text-right leading-none border-b-2 pt-2 pb-2 text-red-400">{formatNumber(item.EXPENSE, {
              style: 'currency',
              currency: 'EUR',
            })}</div>
          </>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export function ExpenseTrendInsights({ data }: { data: ExpenseTrendReport[] }) {
  const chartConfig2 = {
  } satisfies ChartConfig

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Expenses Trend</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart accessibilityLayer data={data} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month"/>
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Bar dataKey="EXPENSE" fill="var(--chart-2)" stackId="stack">
              {/* <LabelList position="top" dataKey="EXPENSE" fillOpacity={1} /> */}
            </Bar>
            <Bar dataKey="INCOME" fill="var(--chart-1)" stackId="stack">
              {/* <LabelList position="top" dataKey="INCOME" fillOpacity={1} /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

/**
 * Generates a random hex color code.
 * @returns {string} A random hex color code in the format '#RRGGBB'.
 */
export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}