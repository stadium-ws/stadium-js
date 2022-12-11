export type IApiRequestConfig<Body> = {
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
  private readonly headers: DefaultHeaders = {
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

  public async request <Reply, Body = {}> (urlSegment: string, config?: IApiRequestConfig<Body>): Promise<Reply> {
    const method = config?.method || 'GET'
    const options = config?.options || {}

    const fetchOptions: Record<string, any> = {
      method,
      headers: {
        ...this.headers
      },
      body: undefined
    }

    if (config?.body) {
      fetchOptions.body = JSON.stringify(config.body)
    }

  const url = `${this.baseUrl}/${urlSegment}`

  return fetch(url, {
    ...fetchOptions,
    ...options
  }).then(async res => {
    if (!this.successStatuses.includes(res.status)) {
      const text = await res.text()
      throw new ApiRequestError(text, res.status)
    }

    if (res.status === 201) {
      return
    }

    return res.json()
  })
    .then(data => data)
  }
}

export default Requester
