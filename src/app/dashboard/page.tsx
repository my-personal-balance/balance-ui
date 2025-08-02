import { Transactions } from '@/components/transactions/transations'
import { CommonApp } from '@/app/common'

export default function Page({ title }: { title: string }) {
  return (
    <CommonApp title={title}>
      <Transactions title={title} />
    </CommonApp>
  )
}
