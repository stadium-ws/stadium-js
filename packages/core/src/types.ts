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
