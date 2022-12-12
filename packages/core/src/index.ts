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
import type { Channel, ReplyGetChannels, User } from './types'

// const API_URL = 'https://api.stadium.ws'
const API_URL = 'http://localhost:4000'

const IS_BROWSER = !!global.window

interface IStadiumConfig {
  clientId?: string
  clientSecret?: string
}

export class Stadium {
  private readonly config: IStadiumConfig
  private requester: Requester
  private accessToken?: string

  constructor (config: IStadiumConfig = {}) {
    if (IS_BROWSER) {
      if (config.clientId || config.clientSecret) {
        throw new Error('Stadium: You cannot pass a clientId or clientSecret when running in the browser, use the setUserToken method instead.')
      }
    }

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
  }): Promise<User> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: 'users',
      method: 'POST',
      body: {
        userRoleId,
        displayName,
        meta
      }
    })
  }

  public setUserToken (token: string) {
    this.accessToken = token
    this.requester.setTokenHeader(this.accessToken)
  }

  public async getMe (): Promise<User> {
    const res = await this.requester.request<{
      user: User
    }>({
      urlSegment: 'oauth/token'
    })

    return res.user
  }

  public async getChannels (): Promise<ReplyGetChannels> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: 'channels'
    })
  }

  public async getChannel (channelId: string): Promise<Channel> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: `channels/${channelId}`
    })
  }

  private async ensureAccessToken () {
    if (this.accessToken) {
      return
    }

    const accessTokenResponse = await this.requester.request<{
      access_token: string
    }>({
      urlSegment: 'oauth/token',
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret
      }
    })

    if (!accessTokenResponse?.access_token) {
      throw new Error('Could not authenticate with Stadium')
    }

    this.accessToken = accessTokenResponse.access_token
    this.requester.setTokenHeader(this.accessToken)
  }
}
