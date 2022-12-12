import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import useChannelEvents from '@/hooks/useChannelEvents'
import Loader from '@/components/Loader'
import TimeAgo from 'react-timeago'
import { useSession } from '@/contexts/SessionContext'

const Component = styled.div`
  padding: .5rem;
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
`

const EventInner = styled.div`
  color: white;
  display: inline-block;
  margin-left: auto;
  border: 1px solid rgba(255, 255, 255, .1);
  padding: .5rem;
  border-radius: 4px;
  max-width: 450px;
`

const Event = styled.div<{
  isSelf: boolean
}>`
  margin-bottom: .75rem;
  display: flex;

  ${EventInner} {
    margin-left: ${({ isSelf }) => isSelf ? 'auto' : '0'};
  }
`

const EventContent = styled.div``
const EventFooter = styled.div`
`

const EventDate = styled.div`
  font-size: .75rem;
  opacity: .25;
`

const EventAuthor = styled.div`
  font-size: .74rem;
  opacity: .5;
`

interface ChannelEvents {
  channelId: string
}

const ChannelEvents = ({
  channelId
}: ChannelEvents) => {
  const refEvents = useRef<HTMLDivElement>(null)
  const { loading, events } = useChannelEvents({
    channelId
  })
  const session = useSession()

  useEffect(() => {
    const elEvents = refEvents.current

    if (!elEvents) {
      return
    }

    elEvents.scrollTop = elEvents.scrollHeight
  }, [events])

  if (loading || !events?.length) {
    return (
      <Loader />
    )
  }

  return (
    <Component ref={refEvents}>
      {events!.map(e => {
        const isSelf = e.user.id === session.user!.id

        return (
          <Event
            key={e.id}
            isSelf={isSelf}
          >
            <EventInner>
              <EventContent>
                {e.content}
              </EventContent>
              <EventFooter>
                <EventAuthor>
                  {e.user.displayName}
                </EventAuthor>
                <EventDate>
                  <TimeAgo date={e.createdAt} />
                </EventDate>
              </EventFooter>
            </EventInner>
          </Event>
        )
      })}
    </Component>
  )
}

export default ChannelEvents
