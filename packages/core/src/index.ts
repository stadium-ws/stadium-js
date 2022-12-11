/**
 * TODO:
 *  - Use cross platform websockets i.e. @see https://github.com/heineiuo/isomorphic-ws
 *  - https://github.com/GetStream/stream-chat-js/blob/master/src/client.ts
 *
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

import Requester from './Requester'

const API_URL = 'https://api.stadium.ws'

interface IStadiumConfig {
  clientId: string
  clientSecret: string
}

export class Stadium {
  private readonly config: IStadiumConfig
  private requester: Requester
  private accessToken?: string

  constructor (config: IStadiumConfig) {
    this.config = config
    this.requester = new Requester(API_URL)
  }

  public async createUser ({
    userRoleId,
    displayName,
    meta
  }: {
    userRoleId?: string
    displayName?: string,
    meta?: any
  }): Promise<any> {
    await this.ensureAccessToken()

    return this.requester.request('/users', {
      method: 'POST',
      body: {
        userRoleId,
        displayName,
        meta
      }
    })
  }

  public async addUserToChannel (userId: string, channelId: string): Promise<any> {
    await this.ensureAccessToken()

    return this.requester.request(`/channels/${channelId}/users`, {
      method: 'POST',
      body: {
        id: userId
      }
    })
  }

  private async ensureAccessToken () {
    if (this.accessToken) {
      return
    }

    this.accessToken = await this.requester.request('/oauth/token', {
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret
      }
    })

    if (!this.accessToken) {
      throw new Error('Could not authenticate with Stadium')
    }

    this.requester.setTokenHeader(this.accessToken)
  }
}