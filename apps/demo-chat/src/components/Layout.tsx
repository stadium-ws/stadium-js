import React from 'react'
import styled from 'styled-components'

const Component = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`

interface Layout {
  children: React.ReactNode
}

const Layout = ({ children }: Layout) => {
  return (
    <Component>
      {children}
    </Component>
  )
}

export default Layout