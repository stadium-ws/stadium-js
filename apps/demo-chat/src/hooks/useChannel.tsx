import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'
import { Channel } from '@stadium/core'

interface UseChannelState {
  loading: boolean
  channel?: Channel
  error: any
}

const useChannels = (channelId: string) => {
  const [state, setState] = useState<UseChannelState>({
    loading: false,
    channel: undefined,
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

        const channel = await stadium.getChannel(channelId)

        setState(prevState => ({
          ...prevState,
          loading: false,
          channel
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
    channel: state.channel,
    error: state.error
  }
}

export default useChannels
