import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Route } from '@/constants/Route'
import { register as apiRegister } from '@/api/register'
import stadium from '@/utils/stadium'

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

  const register = async (displayName: string) => {
    const apiRegisterRes = await apiRegister(displayName)
    setUser(apiRegisterRes.user)
    stadium.setUserToken(apiRegisterRes.token)
    await router.push(Route.CHANNELS)
  }

  const logout = async () => {
    setUser(undefined)
    await router.push(Route.HOME)
  }

  const sessionContext: SessionContext = {
    user,
    isInitialized,
    register,
    logout
  }

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider
