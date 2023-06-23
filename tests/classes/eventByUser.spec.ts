import { faker } from "@faker-js/faker"

import EventByUser from "@src/classes/eventByUser"

describe('EventByUser expectations', () => {
  it('should be able to create a eventByUser', () => {
    const url = "/pages/" + faker.animal.cat().replace(/ /g, "-")
    const timestamp = faker.date.anytime().getTime()

    const eventByUser = new EventByUser({
      url,
      timestamp
    })

    expect(eventByUser).toBeTruthy()
    expect(eventByUser).toBeInstanceOf(EventByUser)
  })

  it('should be able to get eventByUser properties', () => {
    const url = "/pages/" + faker.animal.cat().replace(/ /g, "-")
    const timestamp = faker.date.anytime().getTime()

    const eventByUser = new EventByUser({
      url,
      timestamp
    })

    expect(eventByUser.url).toBeTruthy()
    expect(eventByUser.url).toBe(url)

    expect(eventByUser.timestamp).toBeTruthy()
    expect(eventByUser.timestamp).toBe(timestamp)
  })
})
