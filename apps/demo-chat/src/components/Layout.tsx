import React from 'react'
import Header from '@/components/Header'
import Container from '@/components/Container'
import { inter } from '@/utils/fonts'

import styled from 'styled-components'

const Component = styled.div``
const Content = styled.div`
  padding: 1rem;
`

interface Layout {
  children: React.ReactNode
}

const Layout = ({ children }: Layout) => {
  return (
    <Component className={inter.className}>
      <Header />
      <Container>
        <Content>
          {children}
        </Content>
      </Container>
    </Component>
  )
}

export default Layout
