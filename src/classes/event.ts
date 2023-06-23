interface IEventProps {
  url: string
  visitorId: string
  timestamp: number
}

class Event {
  private _url: string
  private _visitorId: string
  private _timestamp: number

  constructor(
    {
      url,
      visitorId,
      timestamp
    }: IEventProps
  ) {
    this._url = url
    this._visitorId = visitorId
    this._timestamp = timestamp
  }
  
  public get url(): string {
    return this._url
  }

  public get visitorId(): string {
    return this._visitorId
  }

  public get timestamp(): number {
    return this._timestamp
  }
}

export default Event
