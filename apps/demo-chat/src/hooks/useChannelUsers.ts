import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'
import { ChannelUser } from '@stadium-ws/core'

interface UseChannelState {
  loading: boolean
  users?: ChannelUser[]
  error: any
}

const useChannelUsers = (channelId: string) => {
  const [state, setState] = useState<UseChannelState>({
    loading: false,
    users: undefined,
    error: undefined
  })

  useEffect(() => {
    (async () => {
      try {
        setState(prevState => ({
          ...prevState,
          loading: true,
          error: undefined
        }))

        const res = await stadium.getChannelUsers(channelId)

        setState(prevState => ({
          ...prevState,
          loading: false,
          users: res.users
        }))
      } catch (e) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: e
        }))
      }
    })()
  }, [])

  return {
    loading: state.loading,
    users: state.users,
    error: state.error
  }
}

export default useChannelUsers
