interface IEventByUserProps {
  url: string
  timestamp: number
}

class EventByUser {
  public url: string
  public timestamp: number

  constructor(
    {
      url,
      timestamp
    }: IEventByUserProps
  ) {
    this.url = url
    this.timestamp = timestamp
  }
}

export default EventByUser
