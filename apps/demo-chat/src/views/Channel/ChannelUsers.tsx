import React from 'react'
import styled from 'styled-components'
import useChannelUsers from '@/hooks/useChannelUsers'
import Loader from '@/components/Loader'

const Component = styled.div`
  width: 200px;
  margin-left: 1rem;
  border: 1px solid rgba(255, 255, 255, .1);
`

const Header = styled.div`
  padding: .5rem;
  border-bottom: 1px solid rgba(255, 255, 255, .1);
`

const Title = styled.div``

const Users = styled.div`
`

const User = styled.div`
  font-size: .85rem;
  padding: .5rem;
  opacity: .5;
`

const UserName = styled.div``

interface ChannelUsers {
  channelId: string
}

const ChannelUsers = ({ channelId }: ChannelUsers) => {
  const { loading, users } = useChannelUsers(channelId)

  if (loading || !users) {
    return (
      <Loader />
    )
  }

  return (
    <Component>
      <Header>
        <Title>
          Members
        </Title>
      </Header>
      <Users>
        {users.map(user => {
          return (
            <User key={user.id}>
              <UserName>
                {user.displayName}
              </UserName>
            </User>
          )
        })}
      </Users>
    </Component>
  )
}

export default ChannelUsers
