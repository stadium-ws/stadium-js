import React from 'react'
import Guard from '@/components/Guard'
import useChannel from '@/hooks/useChannel'
import { useRouter } from 'next/router'
import Loader from '@/components/Loader'
import styled from 'styled-components'

const ChannelName = styled.div``

const ChannelInner = () => {
  const router = useRouter()
  const channelId = router.query.id as string
  const { loading, channel } = useChannel(channelId)

  if (loading || !channel) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <ChannelName>
        {channel.name}
      </ChannelName>
    </>
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
