export interface EventUser {
  id: string
  displayName: string
  userRoleId: string
  meta: any
}

export interface EventAttachment {
  id: string
  mimeType: string
  fileName: string
  url: string
  description: string
  size: number
}

export interface EventReaction {
  id: string
  type: string
  score: number
  meta: any
  user: EventUser
  createdAt: string
}

export interface Event {
  id: string
  type: number
  channelId: string
  user: EventUser
  content?: string
  attachments: EventAttachment[]
  reactions: EventReaction[]
  createdAt: string
  updatedAt: string
  meta: any
}

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

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface CursorPagination {
  cursor?: string
  limit: number
  sort?: {
    [key: string]: SortDirection
  }
}

export interface QueryGetChannelEvents extends CursorPagination {
  type?: number
}

export interface ReplyGetChannelEvents {
  events: Event[]
  cursor: string
}

export interface ReplyGetChannels {
  channels: Channel[]
  meta: PagePagination
}

export interface ReplyGetChannelUsers {
  users: ChannelUser[]
  meta: PagePagination
}

export interface CreateEvent {
  type: number
  channelId: string
  content?: string
  userId?: string
  meta?: any
  attachments?: EventAttachment[]
}
