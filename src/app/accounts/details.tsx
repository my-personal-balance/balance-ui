import { getRouteApi } from "@tanstack/react-router"
import { Transactions } from "@/components/transactions/transations"

export default function Page() {
  const routeApi = getRouteApi('/_auth/accounts/$accountId')
  const { account } = routeApi.useLoaderData()
  
  return (
    <Transactions
      title={account.alias}
      accountId={account.id}
    />
  )
}
