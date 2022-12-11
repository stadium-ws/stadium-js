import React from 'react'
import styled from 'styled-components'
import { useSession } from '@/contexts/SessionContext'
import Container from '@/components/Container'

const Component = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, .1);
  font-size: 0.85rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 100%;
`

const Branding = styled.div``

const UserInfo = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const DisplayName = styled.div`
  margin-right: .5rem;
`

const Logout = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, .5);
`

const Header = () => {
  const session = useSession()
  const isLoggedIn = !!session.user

  const handleLogoutClick = () => {
    session.logout()
  }

  return (
    <Component>
      <Container>
        <Content>
          <Branding>
            Chat app.
          </Branding>
          {isLoggedIn && (
            <UserInfo>
              <DisplayName>
                {session.user!.displayName}
              </DisplayName>
              <Logout onClick={handleLogoutClick}>
                Logout
              </Logout>
            </UserInfo>
          )}
        </Content>
      </Container>
    </Component>
  )
}

export default Header
