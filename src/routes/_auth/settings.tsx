import Page from '@/app/settings/page'
import { createFileRoute } from '@tanstack/react-router'
import { LogoutComponent } from '@/routes/logout'
import { getUser } from '@/api/users'

export const Route = createFileRoute('/_auth/settings')({
  loader: async ({ context }) => {
    const user = await getUser(context.auth.accessToken ?? '')
    return {
      user,
    }
  },
  component: Page,
  errorComponent: LogoutComponent,
})
