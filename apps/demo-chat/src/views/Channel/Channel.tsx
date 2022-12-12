import React from 'react'
import Guard from '@/components/Guard'
import useChannel from '@/hooks/useChannel'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import styled from 'styled-components'
import ChannelUsers from '@/views/Channel/ChannelUsers'
import ChannelEvents from '@/views/Channel/ChannelEvents'
import CreateMessage from '@/views/Channel/CreateMessage'

const CONTENT_PADDING = 32

const Component = styled.div`
  display: flex;
  height: calc(100vh - ${({ theme }) => theme.headerHeight + (CONTENT_PADDING)}px);
`

const Content = styled.div``
const Header = styled.div``
const Footer = styled.div``
const EventsContainer = styled.div``
const ChannelName = styled.div``
const UsersContainer = styled.div`
  margin-left: auto;
`

const ChannelInner = () => {
  const router = useRouter()
  const channelId = router.query.id as string
  const { loading, channel } = useChannel(channelId)

  if (loading || !channel) {
    return (
      <Loader />
    )
  }

  return (
    <Component>
      <Content>
        <Header>
          <ChannelName>
            {channel.name}
          </ChannelName>
        </Header>
        <EventsContainer>
          <ChannelEvents channelId={channel.id} />
        </EventsContainer>
        <Footer>
          <CreateMessage />
        </Footer>
      </Content>
      <UsersContainer>
        <ChannelUsers channelId={channel.id} />
      </UsersContainer>
    </Component>
  )
}

const Channel = () => {
  return (
    <Guard>
      <ChannelInner />
    </Guard>
  )
}

export default Channel
