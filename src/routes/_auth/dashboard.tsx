import { createFileRoute } from '@tanstack/react-router'
import Page from '@/app/dashboard/page'
import { LogoutComponent } from '@/routes/logout'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Page,
  errorComponent: LogoutComponent,
})

