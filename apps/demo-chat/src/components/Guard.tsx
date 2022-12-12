import React from 'react'
import { useSession } from '@/contexts/SessionContext'
import Redirect from '@/components/Redirect'
import { Route } from '@/constants/Route'

interface Guard {
  children: React.ReactNode
}

const Guard = ({ children }: Guard) => {
  const session = useSession()
  const isLoggedIn = !!session.user

  if (!isLoggedIn) {
    return (
      <Redirect to={Route.HOME} />
    )
  }

  return (
    <>
      {children}
    </>
  )
}

export default Guard
