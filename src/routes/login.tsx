import { useActionState } from 'react'
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import { z } from 'zod'
import { useAuth } from '@/auth'
import { LoginForm } from "@/components/login-form"

const fallback = '/dashboard' as const

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }: { context: any, search: any }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback })
    }
  },
  component: LoginComponent,
})

function LoginComponent() {
  const auth = useAuth()
  const router = useRouter()
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  const search = Route.useSearch()

  const authenticate = async (_: any, data: FormData) => {
    const email = data.get('email') as string
    const password = data.get('password') as string
    try {
      await auth.login(email, password)
    } catch (error) {
      return { 
        error,
        message: 'Invalid email or password'
      }
    }

    await router.invalidate()
    await router.navigate({ to: search.redirect || fallback })
  }

  const [error, submitAction, isPending] = useActionState(authenticate, null)

  const isLoggingIn = isLoading || isPending

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          submitAction={submitAction}
          isLoggingIn={isLoggingIn}
          error={error}
        />
      </div>
    </div>
  )
}
