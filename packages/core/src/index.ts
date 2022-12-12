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

export interface UserRole {
  id: string
  name: string
  description: string
  permissions: string[]
  createdAt: string
  updatedAt: string
  meta: any
}

export interface User {
  id: string
  displayName?: string
  userRole: UserRole
  userRoleId: string
  createdAt: string
  updatedAt: string
  meta: any
}

export enum ChannelType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  DIRECT = 'DIRECT'
}

export interface ChannelUser {
  id: string
  displayName?: string
  userRoleId: string
  meta: any
}

export interface Channel {
  id: string
  name: string
  type: ChannelType
  meta: any
  onlineUserCount: number
  totalUserCount: number
  appId: string
  creator: ChannelUser
  createdAt: string
  updatedAt: string
}

export interface PagePagination {
  total: number
  lastPage: number
}

export interface ReplyGetChannels {
  channels: Channel[]
  meta: PagePagination
}

import Requester from './Requester'

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

  public getMe (): Promise<User> {
    return this.requester.request({
      urlSegment: 'users/me'
    })
  }

  public async getChannels (): Promise<ReplyGetChannels> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: 'channels'
    })
  }

  public async addUserToChannel (userId: string, channelId: string): Promise<any> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: `channels/${channelId}/users`,
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
