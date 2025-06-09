import { ThemeProvider } from './components/theme-provider'
import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from '@/router'
import { AuthProvider, useAuth } from '@/auth'

const router = createRouter()

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ThemeProvider> 
  )
}

export default App
