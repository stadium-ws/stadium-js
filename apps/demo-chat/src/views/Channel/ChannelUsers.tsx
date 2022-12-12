import React from 'react'
import styled from 'styled-components'

const Component = styled.div``
const Header = styled.div``
const Title = styled.div``

interface ChannelUsers {
  channelId: string
}

const ChannelUsers = ({ channelId }: ChannelUsers) => {
  return (
    <Component>
      <Header>
        <Title>
          Members
        </Title>
      </Header>
    </Component>
  )
}

export default ChannelUsers
