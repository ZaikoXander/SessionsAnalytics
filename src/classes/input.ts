import Event from "./event"

import IInputObject from "../interfaces/input/inputObject"

class Input {
  private _events: Event[]

  constructor(events: Event[]) {
    this._events = events
  }

  static fromObject(inputData: IInputObject): Input {
    const inputEvents = inputData.events.map(event => new Event(event))

    const input = new Input(inputEvents)

    return input
  }

  public get events(): Event[] {
    return this._events
  }
}

export default Input
