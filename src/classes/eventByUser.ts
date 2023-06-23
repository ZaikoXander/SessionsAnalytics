interface IEventByUserProps {
  url: string
  timestamp: number
}

class EventByUser {
  private _url: string
  private _timestamp: number

  constructor(
    {
      url,
      timestamp
    }: IEventByUserProps
  ) {
    this._url = url
    this._timestamp = timestamp
  }
  
  public get url(): string {
    return this._url
  }

  public get timestamp(): number {
    return this._timestamp
  }
}

export default EventByUser
