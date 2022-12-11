import React from 'react'
import Header from '@/components/Header'
import Container from '@/components/Container'

interface Layout {
  children: React.ReactNode
}

const Layout = ({ children }: Layout) => {
  return (
    <>
      <Header />
      <Container>
        {children}
      </Container>
    </>
  )
}

export default Layout
