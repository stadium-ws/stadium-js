import { Stadium } from '@stadium-ws/core'
import { API_URL, GATEWAY_URL } from '@/config'

const stadium = new Stadium({
  clientId: '8Ax8/A34SJmycSLBAi8xFlTRT0BR8YJi6oBLr8qEvPc=',
  clientSecret: '$2b$04$cy3A7evcUmC5xsSOQDu/KuevmBuz3K.XvtvqwLLvnuF9cmiSIhw0y',
  apiUrl: API_URL,
  gatewayUrl: GATEWAY_URL
})

export default stadium
