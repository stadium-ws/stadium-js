import dynamic from 'next/dynamic'

export default dynamic(() => import('./Channels'), {
  ssr: false
})
