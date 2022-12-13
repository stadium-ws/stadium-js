import WebSocket from 'isomorphic-ws'

// const GATEWAY_URL = 'wss://gateway.stadium.ws'
const GATEWAY_URL = 'ws://localhost:5000'

interface Connect {
  onEvent: (event: SocketMessage) => void
  token: string
}

export enum MessageType {
  EVENT_CREATE,
  EVENT_DELETE,
  EVENT_UPDATE,
  EVENT_REACTION_CREATE,
  EVENT_REACTION_DELETE,
  CHANNEL_UPDATE,
  CHANNEL_USER_ADDED
}

export interface SocketMessage {
  type: MessageType
  data: any
}

class Connection {
  private webSocket: WebSocket
  private isConnected: boolean = false

  public connect = ({ onEvent, token }: Connect): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.webSocket = new WebSocket(`${GATEWAY_URL}?token=${token}`)

      this.webSocket.addEventListener('error', () => {
        reject(new Error('nope'))

        // TODO: make me
      })

      this.webSocket.addEventListener('message', (e: any) => {
        const data = JSON.parse(e.data) as SocketMessage
        onEvent(data)
      })

      this.webSocket.addEventListener('open', () => {
        this.isConnected = true
        resolve()
      })

      this.webSocket.addEventListener('close', () => {
        this.isConnected = false

        // TODO: make me
      })
    })
  }

  public disconnect = async (): Promise<void> => {
    if (!this.isConnected) {
      return
    }

    // TODO: perhaps add more params, as they are supported...
    this.webSocket.close()
  }
}

export default Connection
