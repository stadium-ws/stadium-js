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

import EventEmitter from 'eventemitter3'

import type { SocketMessage } from './Connection'
import Connection from './Connection'
import Requester from './Requester'
import type {
  Channel,
  ReplyGetChannels,
  User,
  ReplyGetChannelUsers,
  Event,
  CreateEvent,
  QueryGetChannelEvents,
  ReplyGetChannelEvents,
  UpdateUser
} from './types'
import type { EventName } from './utils'
import { getEventName } from './utils'

const API_URL = 'https://api.stadium.ws'

const IS_BROWSER = !!global.window

interface IStadiumConfig {
  clientId?: string
  clientSecret?: string
}

export class Stadium {
  private readonly config: IStadiumConfig
  private requester: Requester
  private accessToken?: string
  private connection?: Connection
  private emitter?: EventEmitter

  constructor (config: IStadiumConfig = {}) {
    if (IS_BROWSER) {
      if (config.clientId || config.clientSecret) {
        throw new Error('Stadium: You cannot pass a clientId or clientSecret when running in the browser, use the setUserToken method instead.')
      }
    }

    this.config = config
    this.requester = new Requester(API_URL)
  }

  public on (event: EventName, listener: (...args: any[]) => void) {
    if (!this.emitter) {
      this.emitter = new EventEmitter()
    }

    this.emitter.on(event, listener)
  }

  public once (event: EventName, listener: (...args: any[]) => void) {
    if (!this.emitter) {
      this.emitter = new EventEmitter()
    }

    this.emitter.once(event, listener)
  }

  public off (event: EventName, listener: (...args: any[]) => void) {
    if (!this.emitter) {
      return
    }

    this.emitter.off(event, listener)
  }

  public removeAllListeners () {
    if (!this.emitter) {
      return
    }

    this.emitter.removeAllListeners()
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

  public async getChannelUsers (channelId: string): Promise<ReplyGetChannelUsers> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: `channels/${channelId}/users`
    })
  }

  public async createEvent (options: CreateEvent): Promise<Event> {
    await this.ensureAccessToken()

    return this.requester.request({
      urlSegment: 'events',
      method: 'POST',
      body: options
    })
  }

  public async getChannelEvents (channelId: string, options: QueryGetChannelEvents): Promise<ReplyGetChannelEvents> {
    await this.ensureAccessToken()

    const query: QueryGetChannelEvents = {
      cursor: options.cursor,
      limit: options.limit,
      sort: options.sort,
      type: options.type
    }

    return this.requester.request({
      urlSegment: `channels/${channelId}/events`,
      query: query
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

  public updateUser = async (userId: string, options: UpdateUser): Promise<User> => {
    await this.ensureAccessToken()

    const body: any = {}

    if (options.displayName) {
      body.displayName = options.displayName
    }

    if (options.isOnline) {
      body.isOnline = options.isOnline
    }

    if (options.meta) {
      body.meta = options.meta
    }

    if (options.userRoleId) {
      body.userRoleId = options.userRoleId
    }

    return this.requester.request({
      urlSegment: `users/${userId}`,
      method: 'PUT',
      body
    })
  }

  private onEvent = (event: SocketMessage) => {
    const eventName = getEventName(event.type)

    this.emitter?.emit(eventName, event.data)
  }

  public async connect () {
    this.connection = new Connection()
    this.emitter = new EventEmitter()

    await this.connection.connect({
      token: this.accessToken!,
      onEvent: this.onEvent
    })
  }

  public async disconnect () {
    if (!this.connection) {
      return
    }

    this.emitter?.removeAllListeners()

    return this.connection.disconnect()
  }
}
