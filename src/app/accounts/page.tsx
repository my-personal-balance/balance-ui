import { AddAccount } from "@/components/accounts/add-accounts"
import { getRouteApi, Link } from "@tanstack/react-router"
import type { Account } from "@/types/accounts"
import { CommonApp } from "@/app/common"

export default function Page() {

  const routeApi = getRouteApi("/_auth/accounts/")
  const { accounts } = routeApi.useLoaderData()

  return (
    <CommonApp title="Accounts">
      <div className="px-4 lg:px-6">
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1 w-[340px]">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
          </div>
          <Accounts accounts={accounts} />
          <AddAccount />
        </div>
      </div>
    </CommonApp>
  )
}

const Accounts = ({ accounts }: {accounts: Account[]}) => {
  return accounts?.map(account => (
    <Link to={`/accounts/$accountId`} params={{ accountId: account.id?.toString() ?? ''}} key={account.id}>
      <div className="items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted">
        <div className="w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">
                {account.alias}
              </div>
            </div>
            <div className="ml-auto text-xs text-foreground">
              {Intl.NumberFormat('en-us', {minimumFractionDigits: 2}).format(account.balance || 0)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  ))
}