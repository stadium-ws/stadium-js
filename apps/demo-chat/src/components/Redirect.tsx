import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Redirect {
  to: string
}

const Redirect = ({ to }: Redirect) => {
  const router = useRouter()

  useEffect(() => {
    router.push(to)
  }, [])

  return null
}

export default Redirect
