import React from 'react'
import styled from 'styled-components'
import { TailSpin } from 'react-loader-spinner'

const Component = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SIZE = 32

const LoadingSplash = () => {
  return (
    <Component>
      <TailSpin
        height={SIZE}
        width={SIZE}
        color='#fff'
        visible
      />
    </Component>
  )
}

export default LoadingSplash
