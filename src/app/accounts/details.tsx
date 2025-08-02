import { getRouteApi, Link } from '@tanstack/react-router'
import { Transactions } from '@/components/transactions/transations'
import { CommonApp } from '@/app/common'

export default function Page() {
  const routeApi = getRouteApi('/_auth/accounts/$accountId')
  const { account } = routeApi.useLoaderData()

  return (
    <CommonApp title={[<Link to="/accounts">Accounts</Link>, account.alias]}>
      <Transactions title={account.alias} accountId={account.id} />
    </CommonApp>
  )
}
