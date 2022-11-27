/**
 * TODO:
 *  - Use cross platform websockets i.e. @see https://github.com/heineiuo/isomorphic-ws
 *  - Add socket authentication (which is required!)
 *  - createUser
 *  - addUserToChannel
 *  - updateChannel
 *  - onEvent?
 *  - onChannelEvent?
 *  - getChannelMessages
 *  - getChannel
 *  - createChannelEvent
 *  - onNotification?
 *  - registerUserDevice? for push notifications
 */

import fetch from 'cross-fetch'

interface IStadiumConfig {
  apiKey: string
}

interface IStadiumHandlers {
  onConnected?: (socket: WebSocket) => void
  onDisconnected?: (socket: WebSocket) => void
}

export class Stadium {
  private readonly config: IStadiumConfig
  private readonly handlers: IStadiumHandlers
  private isConnected = false
  private socketUrl: string
  private apiUrl: string
  public socket?: WebSocket

  constructor (config: IStadiumConfig, handlers: IStadiumHandlers) {
    this.config = config
    this.handlers = handlers

    // TODO: add env var
    this.socketUrl = 'ws://localhost:5000'
    this.apiUrl = 'http://localhost:4000'
  }

  public async connect () {
    if (this.isConnected) {
      return
    }

    this.socket = new WebSocket(this.socketUrl)

    this.socket.addEventListener('open', () => {
      this.isConnected = true

      if (this.handlers.onConnected) {
        this.handlers.onConnected(this.socket!)
      }
    })

    this.socket.addEventListener('close', () => {
      this.isConnected = false

      if (this.handlers.onDisconnected) {
        this.handlers.onDisconnected(this.socket!)
      }
    })
  }

  public async getAppAccessToken (apiKey: string, apiSecret: string): Promise<{
    accessToken: string
    expiresIn: string
    tokenType: string
  }> {
    const url = `${this.apiUrl}/oauth/token`

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: apiKey,
        client_secret: apiSecret
      })
    })

    const data = await res.json() as {
      access_token: string
      expires_in: string
      token_type: string
    }

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
      tokenType: data.token_type
    }
  }

  public async getUserAccessToken (userId: string, appAccessToken: string): Promise<{
    accessToken: string
    expiresIn: string
  }> {
    const url = `${this.apiUrl}/users/${userId}/auth`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${appAccessToken}`
      }
    })

    const data = await res.json() as {
      token: string
      expiresIn: string
    }

    return {
      accessToken: data.token,
      expiresIn: data.expiresIn
    }
  }
}
