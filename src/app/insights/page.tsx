import { Transactions } from '@/components/transactions/transations'
import { CommonApp } from '@/app/common'

export default function Page() {
  return (
    <CommonApp title="Insights">
      <Transactions title="Insights" showInsights={true} />
    </CommonApp>
  )
}
