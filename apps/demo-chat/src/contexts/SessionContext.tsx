import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Route } from '@/constants/Route'
import { register as apiRegister } from '@/api/register'
import stadium from '@/utils/stadium'
import LoadingSplash from '@/components/LoadingSplash'
import { clearToken, getToken, setToken } from '@/utils/tokenStore'

interface User {
  id: string
  createdAt: string
  displayName: string
}

interface SessionContext {
  user?: User
  isInitialized: boolean
  register: (displayName: string) => void
  logout: () => Promise<void>
}

export const SessionContext = createContext<SessionContext | null>(null)

export const useSession = (): SessionContext => {
  return useContext(SessionContext) as SessionContext
}

interface SessionContextProvider {
  children: React.ReactNode
}

const SessionContextProvider = ({ children }: SessionContextProvider) => {
  const router = useRouter()
  const [user, setUser] = useState<User | undefined>()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const token = getToken()

      if (!token) {
        setIsInitialized(true)
        return
      }

      stadium.setUserToken(token)

      const me = await stadium.getMe()

      setUser({
        id: me.id,
        displayName: me.displayName!,
        createdAt: me.createdAt
      })

      setIsInitialized(true)
    })()
  }, [])

  const register = async (displayName: string) => {
    const { user, auth } = await apiRegister(displayName)

    setUser(user)
    setToken(auth.token)
    stadium.setUserToken(auth.token)
    await router.push(Route.CHANNELS)
  }

  const logout = async () => {
    setUser(undefined)
    clearToken()
    await router.push(Route.HOME)
  }

  const sessionContext: SessionContext = {
    user,
    isInitialized,
    register,
    logout
  }

  if (!isInitialized) {
    return (
      <LoadingSplash />
    )
  }

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider
