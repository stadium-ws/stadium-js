import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'
import { Event } from '@stadium/core'

interface UseChannelEventsState {
  loading: boolean
  events?: Event[]
  error: any
  nextCursor?: string
}

interface UseChannelEvents {
  channelId: string
  limit?: number
  cursor?: string
  type?: number
}

const useChannelEvents = ({
  channelId,
  limit = 20,
  cursor,
  type
}: UseChannelEvents) => {
  const [state, setState] = useState<UseChannelEventsState>({
    loading: false,
    events: undefined,
    error: undefined,
    nextCursor: undefined
  })

  useEffect(() => {
    (async () => {
      try {
        setState(prevState => ({
          ...prevState,
          loading: true,
          error: undefined
        }))

        // TODO: this does not belong here...
        await stadium.connect()

        const res = await stadium.getChannelEvents(channelId, {
          cursor,
          limit,
          type
        })

        setState(prevState => ({
          ...prevState,
          loading: false,
          events: res.events.reverse(),
          nextCursor: res.cursor
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
    events: state.events,
    error: state.error
  }
}

export default useChannelEvents
