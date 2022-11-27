interface IStadiumConfig {
  appId: string
}

interface IStadiumHandlers {
  onConnected?: (socket: WebSocket) => void
  onDisconnected?: (socket: WebSocket) => void
}

export class Stadium {
  private readonly config: IStadiumConfig
  private readonly handlers: IStadiumHandlers
  private isConnected = false
  private url: string
  public socket?: WebSocket

  constructor (config: IStadiumConfig, handlers: IStadiumHandlers) {
    this.config = config
    this.handlers = handlers

    // TODO: add env var
    this.url = 'ws://localhost:5000'
  }

  public async connect () {
    if (this.isConnected) {
      return
    }

    this.socket = new WebSocket(this.url)

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
}
