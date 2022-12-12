import React from 'react'
import styled from 'styled-components'

const Component = styled.div``

interface ChannelEvents {
  channelId: string
}

const ChannelEvents = ({
  channelId
}: ChannelEvents) => {
  return (
    <Component>
      ChannelEvents
    </Component>
  )
}

export default ChannelEvents
