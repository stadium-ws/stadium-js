import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'

interface UseChannelsState {
  loading: boolean
  data: any
  error: any
}

const useChannels = () => {
  const [state, setState] = useState<UseChannelsState>({
    loading: false,
    data: undefined,
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

        const channels = await stadium.getChannels()

        setState(prevState => ({
          ...prevState,
          loading: false,
          data: channels
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
    data: state.data,
    error: state.error
  }
}

export default useChannels
