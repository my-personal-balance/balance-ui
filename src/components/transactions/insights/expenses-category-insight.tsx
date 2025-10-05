import { useEffect, useState } from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import type { ExpenseTagReport } from '@/types/reports'
import { formatNumber } from '@/lib/utils'

interface ExpensesCategoryInsightProps {
  data: ExpenseTagReport[]
}

export function ExpensesCategoryInsight({
  data
}: ExpensesCategoryInsightProps) {
  const [totalExpenses, setTotalExpenses] = useState(0.0)
  const [chartData] = useState(
    data.map(item => ({
      ...item,
      fill: getRandomColor(),
    }))
  )

  useEffect(() => {
    setTotalExpenses(data.reduce((acc, curr) => acc + curr.EXPENSE, 0))
  }, [data])

  const chartConfig = {} satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-dvh"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-2xs" />}
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
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                            currency: 'EUR',
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
      <CardFooter className="text-xs">
        <div className="grid grid-cols-2 w-full">
          {data.map(item => (
            <>
              <div className="font-medium text-sm border-b-2 pt-2 pb-2">
                {item.tag.value}
              </div>
              <div className="font-medium text-sm border-b-2 pt-2 pb-2 text-red-400 text-right">
                {formatNumber(item.EXPENSE, {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </div>
            </>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

/**
 * Generates a random hex color code.
 * @returns {string} A random hex color code in the format '#RRGGBB'.
 */
function getRandomColor(): string {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
  )
}
