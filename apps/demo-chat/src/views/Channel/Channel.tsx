import React from 'react'
import Guard from '@/components/Guard'

const ChannelInner = () => {
  return (
    <div>
      Channel goes here...
    </div>
  )
}

const Channel = () => {
  return (
    <Guard>
      <ChannelInner />
    </Guard>
  )
}

export default Channel
