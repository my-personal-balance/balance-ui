import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    context: {
      auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
