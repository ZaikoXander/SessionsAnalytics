import { faker } from "@faker-js/faker"

import Event from "@src/classes/event"

describe('Event expectations', () => {
  it('should be able to create a event', () => {
    const url = "/pages/" + faker.animal.cat().replace(/ /g, "-")
    const visitorId = faker.string.uuid()
    const timestamp = faker.date.anytime().getTime()
    const event = new Event({
      url,
      visitorId,
      timestamp
    })

    expect(event).toBeTruthy()
    expect(event).toBeInstanceOf(Event)
  })

  it('should be able to get event properties', () => {
    const url = "/pages/" + faker.animal.cat().replace(/ /g, "-")
    const visitorId = faker.string.uuid()
    const timestamp = faker.date.anytime().getTime()
    const event = new Event({
      url,
      visitorId,
      timestamp
    })

    expect(event.url).toBeTruthy()
    expect(event.url).toBe(url)

    expect(event.visitorId).toBeTruthy()
    expect(event.visitorId).toBe(visitorId)

    expect(event.timestamp).toBeTruthy()
    expect(event.timestamp).toBe(timestamp)
  })
})
