import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'
import { Channel } from '@stadium/core'

interface UseChannelsState {
  loading: boolean
  channels?: Channel[]
  error: any
}

const useChannels = () => {
  const [state, setState] = useState<UseChannelsState>({
    loading: false,
    channels: undefined,
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

        const res = await stadium.getChannels()

        setState(prevState => ({
          ...prevState,
          loading: false,
          channels: res.channels
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
    channels: state.channels,
    error: state.error
  }
}

export default useChannels
