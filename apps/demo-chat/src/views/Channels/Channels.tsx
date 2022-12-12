import React from 'react'
import styled from 'styled-components'
import useChannels from '@/hooks/useChannels'
import Guard from '@/components/Guard'
import Loader from '@/components/Loader'

const Component = styled.div``

const Channel = styled.div`
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, .1);
  margin-bottom: 1rem;
`

const ChannelName = styled.div``

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
          <Channel key={channel.id}>
            <ChannelName>
              {channel.name}
            </ChannelName>
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
