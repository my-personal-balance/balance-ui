import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Balance } from '@/types/balance'
import { formatNumber } from '@/lib/utils'
import { LandmarkIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'

export function BalanceInfo({ balance }: { balance: Balance }) {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Balance</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-blue-500">
            {formatNumber(balance.balance, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <LandmarkIcon className="size-7 text-blue-500" />
          </div>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Inflow</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-green-500">
            {formatNumber(balance.incomes, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <TrendingUpIcon className="size-7 text-green-500" />
          </div>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter> */}
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Outflow</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums text-red-500">
            {formatNumber(balance.expenses * -1, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <TrendingDownIcon className="size-7 text-red-500" />
          </div>
        </CardHeader>
        {/* <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter> */}
      </Card>
    </div>
  )
}
