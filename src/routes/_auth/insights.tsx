import Page from '@/app/insights/page'
import { createFileRoute } from '@tanstack/react-router'
import { LogoutComponent } from '@/routes/logout'

export const Route = createFileRoute('/_auth/insights')({
  component: Page,
  errorComponent: LogoutComponent,
})
