import request from '@/utils/request'

export async function register (displayName: string): Promise<any> {
  return request('/register', {
    method: 'POST',
    body: {
      displayName
    }
  })
}
