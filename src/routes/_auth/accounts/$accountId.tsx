import { createFileRoute } from '@tanstack/react-router'
import { getAccount } from '@/api/accounts'
import Page from '@/app/accounts/details'
import { LogoutComponent } from '@/routes/logout'

export const Route = createFileRoute('/_auth/accounts/$accountId')({
  loader: async ({ context, params: { accountId } }) => {
    const { accessToken } = context.auth
    const account = await getAccount(accessToken, parseInt(accountId))
    return {
      account,
    }
  },
  component: Page,
  errorComponent: LogoutComponent,
})
