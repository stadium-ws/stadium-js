import { TailSpin } from 'react-loader-spinner'
import React from 'react'

interface Loader {
  size?: number
}

const Loader = ({ size }: Loader = { size: 16 }) => {
  return (
    <TailSpin
      height={size}
      width={size}
      color='#fff'
      visible
    />
  )
}

export default Loader
