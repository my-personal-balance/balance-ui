import { useAuth } from '@/auth'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/logout')({
  component: LogoutComponent,
})

export function LogoutComponent() {
  const router = useRouter()
  const auth = useAuth()
  auth.logout().then(() => {
    router.invalidate().finally(() => {
      router.navigate({ to: '/login' })
    })
  })
}
