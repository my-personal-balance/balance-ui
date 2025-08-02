import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { ExpenseTrendReport } from '@/types/reports'

export function ExpenseTrendInsights({ data }: { data: ExpenseTrendReport[] }) {
  const chartConfig2 = {} satisfies ChartConfig

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Expenses Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2}>
          <BarChart accessibilityLayer data={data} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideIndicator />}
            />
            <Bar dataKey="EXPENSE" fill="var(--chart-2)" stackId="stack" />
            <Bar dataKey="INCOME" fill="var(--chart-1)" stackId="stack" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
