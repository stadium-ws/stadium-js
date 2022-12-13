import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'
import { Event } from '@stadium/core'
import { useSession } from '@/contexts/SessionContext'

interface UseChannelEventsState {
  loading: boolean
  events: Event[]
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
  const { user } = useSession()
  const [state, setState] = useState<UseChannelEventsState>({
    loading: false,
    events: [],
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

        stadium.on('eventCreate', (data) => {
          const newEvent = data.event as Event

          setState(prevState => {
            return {
              ...prevState,
              events: [
                ...prevState.events,
                newEvent
              ]
            }
          })
        })

        await stadium.updateUser(user!.id, {
          isOnline: true
        })

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
