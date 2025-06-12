import { Transactions } from "@/components/transactions/transations"
import { CommonApp } from "../common"

export default function Page({ title }: { title: string }) {
  return (
    <CommonApp title={title}>
      <Transactions title={title} />
    </CommonApp>
  )
}
