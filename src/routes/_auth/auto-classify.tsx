import Page from '@/app/auto-classify/page'
import { createFileRoute } from '@tanstack/react-router'
import { LogoutComponent } from '@/routes/logout'

export const Route = createFileRoute('/_auth/auto-classify')({
  component: Page,
  errorComponent: LogoutComponent,
})
