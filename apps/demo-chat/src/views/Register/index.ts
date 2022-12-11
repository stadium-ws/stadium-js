import dynamic from 'next/dynamic'

export default dynamic(() => import('./Register'), {
  ssr: false
})
