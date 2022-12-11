import React from 'react'
import styled from 'styled-components'

const Component = styled.div`
  max-width: ${props => props.theme.containerWidth}px;
  margin: 2rem auto;
  padding: 0 1rem;
`

interface Container {
  children: React.ReactNode
}

const Container = ({ children }: Container) => {
  return (
    <Component>
      {children}
    </Component>
  )
}

export default Container
