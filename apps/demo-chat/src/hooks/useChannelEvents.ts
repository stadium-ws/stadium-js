import { useEffect, useState } from 'react'
import stadium from '@/utils/stadium'
import { Event } from '@stadium-ws/core'
import { useSession } from '@/contexts/SessionContext'
import { getFirebaseToken } from '@/utils/firebase'

interface UseChannelEventsState {
  loading: boolean
  events: Event[]
  error: any
  next?: number
}

interface UseChannelEvents {
  channelId: string
  limit?: number
  from?: number
  type?: number
}

const useChannelEvents = ({
  channelId,
  limit = 20,
  from,
  type
}: UseChannelEvents) => {
  const { user } = useSession()
  const [state, setState] = useState<UseChannelEventsState>({
    loading: false,
    events: [],
    error: undefined,
    next: undefined
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

        const token = await getFirebaseToken()

        if (!token) {
          throw new Error('Could not get Firebase token')
        }

        await stadium.registerDevice(token)

        await stadium.updateUser(user!.id, {
          isOnline: true
        })

        const res = await stadium.getChannelEvents(channelId, {
          from,
          limit,
          type
        })

        setState(prevState => ({
          ...prevState,
          loading: false,
          events: res.events.reverse(),
          next: res.pagination.next
        }))
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)

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
