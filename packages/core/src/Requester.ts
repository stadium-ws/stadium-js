import qs from 'qs'

export type ApiRequestConfig<Body> = {
  urlSegment: string
  method?: string
  options?: any
  body?: Body
  query?: {
    [key: string]: any
  }
}

export type DefaultHeaders = {
  'Content-Type': string
  'Accept': string
  'Authorization'?: string
}

class Requester {
  private readonly baseUrl: string
  private headers: DefaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public setTokenHeader = (token: string) => {
    this.headers['Authorization'] = `Bearer ${token}`
  }

  public clearTokenHeader = () => {
    delete this.headers['Authorization']
  }

  public request = async <Reply, Body = {}> (options: ApiRequestConfig<Body>): Promise<Reply> => {
    let url = `${this.baseUrl}/${options.urlSegment}`

    if (options.query) {
      url += `?${qs.stringify(options.query)}`
    }

    const method = options?.method || 'GET'

    const fetchRes = await fetch(url, {
      method,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers: this.headers
    })

    if (!fetchRes.ok) {
      return Promise.reject(fetchRes)
    }

    if (fetchRes.status === 200) {
      const json = await fetchRes.json()
      return json as Reply
    }

    return {} as Reply
  }
}

export default Requester
