import ISessionByUserObject from "../interfaces/session/sessionByUserObject"

interface ISessionProps {
  duration: number
  pages: string[]
  startTime: number
}

class Session {
  private _duration: number
  private _pages: string[]
  private _startTime: number

  constructor(
    {
      duration,
      pages,
      startTime
    }: ISessionProps
  ) {
    this._duration = duration
    this._pages = pages
    this._startTime = startTime
  }

  public toObject(): ISessionByUserObject {
    const sessionsByUserObject = {
      duration: this._duration,
      pages: this._pages,
      startTime: this._startTime
    }

    return sessionsByUserObject
  }
}

export default Session
