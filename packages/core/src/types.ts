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
  userCount: number
  eventCount: number
  appId: string
  creator: ChannelUser
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  next?: number
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface CursorPagination {
  from?: number
  limit?: number
  direction?: SortDirection
}

export interface QueryGetChannelEvents extends CursorPagination {
  type?: number
}

export interface ReplyGetChannelEvents {
  events: Event[]
  pagination: Pagination
}

export interface QueryGetUserRoles extends CursorPagination {}

export interface ReplyGetUserRoles {
  userRoles: UserRole[]
  pagination: Pagination
}

export interface QueryGetUsers extends CursorPagination {}

export interface ReplyGetUsers {
  users: User[]
  pagination: Pagination
}

export interface QueryGetChannels extends CursorPagination {}

export interface ReplyGetChannels {
  channels: Channel[]
  pagination: Pagination
}

export interface ReplyGetChannelUsers {
  users: ChannelUser[]
  pagination: Pagination
}

export interface CreateEvent {
  type: number
  channelId: string
  content?: string
  userId?: string
  meta?: any
  attachments?: EventAttachment[]
}

export interface UpdateUser {
  displayName?: string
  /**
   * The id of the user role, a user can't update his own user role.
   */
  userRoleId?: string
  isOnline?: boolean
  meta?: any
}
