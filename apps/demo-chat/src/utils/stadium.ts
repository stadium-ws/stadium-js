import { Stadium } from '@stadium-ws/core'
import { API_URL, GATEWAY_URL } from '@/config'

const stadium = new Stadium({
  apiUrl: API_URL,
  gatewayUrl: GATEWAY_URL
})

export default stadium
