import { MessageType } from './Connection'

export type EventName = 'eventCreate' | 'eventDelete' | 'eventUpdate' | 'eventReactionCreate' | 'eventReactionDelete' | 'channelUpdate' | 'channelUserAdded'

const MessageTypeMap: Record<MessageType, EventName> = {
  [MessageType.EVENT_CREATE]: 'eventCreate',
  [MessageType.EVENT_UPDATE]: 'eventUpdate',
  [MessageType.EVENT_DELETE]: 'eventDelete',
  [MessageType.EVENT_REACTION_CREATE]: 'eventReactionCreate',
  [MessageType.EVENT_REACTION_DELETE]: 'eventReactionDelete',
  [MessageType.CHANNEL_UPDATE]: 'channelUpdate',
  [MessageType.CHANNEL_USER_ADDED]: 'channelUserAdded'
}

export const getEventName = (type: MessageType): string => {
  return MessageTypeMap[type]
}
