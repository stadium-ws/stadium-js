interface IStadiumConfig {
  appId: string
}

export class Stadium {
  private readonly config: IStadiumConfig

  constructor (config: IStadiumConfig) {
    this.config = config
  }
}
