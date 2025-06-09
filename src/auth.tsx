import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { AnyContext } from '@tanstack/react-router'
import { sleep } from '@/lib/utils'
import { authenticate } from '@/api/oauth'
import type { User } from './types/users'
import { getUser } from './api/users'

interface AuthContext extends AnyContext {
  isAuthenticated: boolean
  user: User | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthenticationContext = createContext<AuthContext>({
  isAuthenticated: false,
  accessToken: null,
  login: async () => {},
  logout: async () => {},
  user: null,
})

const key = 'tanstack.auth.token'

function getStoredToken() {
  return localStorage.getItem(key)
}

function setStoredToken(accessToken: string | null) {
  if (accessToken) {
    localStorage.setItem(key, accessToken)
  } else {
    localStorage.removeItem(key)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(getStoredToken())
  const isAuthenticated = !!accessToken
  const [user, setUser] = useState<User | null>(null)

  const logout = useCallback(async () => {
    await sleep(250)
    setStoredToken(null)
    setAccessToken(null)
    setUser(null)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { accessToken } = await authenticate(email, password);
    const user = await getUser(accessToken)
    setStoredToken(accessToken)
    setAccessToken(accessToken)    
    setUser(user)
  }, [])

  useEffect(() => {
    setAccessToken(getStoredToken())
    if (accessToken) {
      getUser(accessToken).then(setUser)
    }
  }, [])

  return (
    <AuthenticationContext value={{ isAuthenticated, accessToken, user, login, logout }}>
      {children}
    </AuthenticationContext>
  )
}

export function useAuth(): AuthContext {
  const context = useContext(AuthenticationContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
