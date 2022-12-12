import React from 'react'
import styled from 'styled-components'
import useChannels from '@/hooks/useChannels'
import Guard from '@/components/Guard'
import Loader from '@/components/Loader'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

const Component = styled.div``

const ChannelName = styled.div`
  color: rgba(255, 255, 255, .5);
`

const Channel = styled(Link)`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, .1);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

  &:hover {
    ${ChannelName} {
      color: rgba(255, 255, 255, 1);
    }
  }
`

const ChannelControls = styled.div`
  opacity: .25;
`

const ChannelsInner = () => {
  const { loading, channels } = useChannels()

  if (loading) {
    return (
      <Loader />
    )
  }

  if (!channels?.length) {
    return (
      <div>
        No channels found.
      </div>
    )
  }

  return (
    <Component>
      {channels.map(channel => {
        return (
          <Channel
            href={`/channels/${channel.id}`}
            key={channel.id}
          >
            <ChannelName>
              {channel.name}
            </ChannelName>
            <ChannelControls>
              <ChevronRightIcon width={24} />
            </ChannelControls>
          </Channel>
        )
      })}
    </Component>
  )
}

const Channels = () => {
  return (
    <Guard>
      <ChannelsInner />
    </Guard>
  )
}

export default Channels
