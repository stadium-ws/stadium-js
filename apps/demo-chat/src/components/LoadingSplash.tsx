import React from 'react'
import styled from 'styled-components'
import Loader from '@/components/Loader'

const Component = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingSplash = () => {
  return (
    <Component>
      <Loader size={32} />
    </Component>
  )
}

export default LoadingSplash
