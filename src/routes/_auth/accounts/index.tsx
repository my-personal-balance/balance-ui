import Page from '@/app/accounts/page'
import { createFileRoute } from '@tanstack/react-router'
import { LogoutComponent } from '@/routes/logout'
import { listAccounts } from '@/api/accounts'

export const Route = createFileRoute('/_auth/accounts/')({
  loader: async ({ context }: { context: any }) => {
    const { accessToken } = context.auth
    const { accounts } = await listAccounts(accessToken)
    return {
      accounts
    }
  },
  component: Page,
  errorComponent: LogoutComponent,
})