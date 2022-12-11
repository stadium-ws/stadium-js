import request from '@/utils/request'

export async function register (displayName: string): Promise<any> {
  return request({
    urlSegment: '/register',
    method: 'POST',
    body: {
      displayName
    }
  })
}
