export type IApiRequestConfig<Body> = {
  urlSegment: string
  method?: string
  options?: any
  body?: Body
}

export type DefaultHeaders = {
  'Content-Type': string
  'Accept': string
  'Authorization'?: string
}

class ApiRequestError extends Error {
  readonly statusCode: number

  constructor (
    message: string,
    statusCode: number
  ) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

class Requester {
  private readonly baseUrl: string
  private readonly successStatuses: number[] = [200, 201]
  private headers: DefaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }

  constructor (baseUrl: string, successStatuses: number[] = [200, 201]) {
    this.baseUrl = baseUrl
    this.successStatuses = successStatuses
  }

  public setTokenHeader = (token: string) => {
    this.headers['Authorization'] = `Bearer ${token}`
  }

  public clearTokenHeader = () => {
    delete this.headers['Authorization']
  }

  public request = async <Reply, Body = {}> (options: IApiRequestConfig<Body>): Promise<Reply> => {
    const url = `${this.baseUrl}/${options.urlSegment}`

    const method = options?.method || 'GET'

    const fetchRes = await fetch(url, {
      method,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers: this.headers
    })

    if (!this.successStatuses.includes(fetchRes.status)) {
      const text = await fetchRes.text()
      throw new ApiRequestError(text, fetchRes.status)
    }

    if (fetchRes.status === 201) {
      return {} as Reply
    }

    const json = await fetchRes.json()

    return json as Reply
  }
}

export default Requester
