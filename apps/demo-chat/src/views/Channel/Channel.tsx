import React from 'react'
import Guard from '@/components/Guard'
import useChannel from '@/hooks/useChannel'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import styled from 'styled-components'
import ChannelUsers from '@/views/Channel/ChannelUsers'

const Component = styled.div`
  display: flex;
`

const Content = styled.div``
const Header = styled.div``
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
