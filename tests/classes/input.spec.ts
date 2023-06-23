import { faker } from "@faker-js/faker"

import Event from "@src/classes/event"
import Input from "@src/classes/input"

import eventFactory from "@tests/factories/eventFactory"

describe('Input expectations', () => {
  it('should be able to create a input', () => {
    const eventCount = faker.number.int({
      min: 6,
      max: 16
    })
    const events: Event[] = []
    for (let i = 0; i < eventCount; i++) {
      events.push(eventFactory())
    }

    const input = new Input(events)

    expect(input).toBeTruthy()
    expect(input).toBeInstanceOf(Input)
  })

  it('should be able to get input events', () => {
    const eventCount = faker.number.int({
      min: 6,
      max: 16
    })
    const events: Event[] = []
    for (let i = 0; i < eventCount; i++) {
      events.push(eventFactory())
    }

    const input = new Input(events)

    expect(input.events).toBeTruthy()
    expect(input.events).toBe(events)
  })
})
