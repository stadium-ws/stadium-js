import React, { createContext, useContext, useState } from 'react'

interface User {
  id: string
  createdAt: string
  displayName: string
}

interface SessionContext {
  user?: User
  isInitialized: boolean
  setUser: (user: User) => void
  logout: () => void
}

export const SessionContext = createContext<SessionContext | null>(null)

export const useSession = (): SessionContext => {
  return useContext(SessionContext) as SessionContext
}

interface SessionContextProvider {
  children: React.ReactNode
}

const SessionContextProvider = ({ children }: SessionContextProvider) => {
  const [user, setUser] = useState<User | undefined>()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)

  const logout = () => {
    setUser(undefined)
  }

  const sessionContext: SessionContext = {
    user,
    isInitialized,
    setUser,
    logout
  }

  return (
    <SessionContext.Provider value={sessionContext}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContextProvider
