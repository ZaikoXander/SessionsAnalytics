import { faker } from "@faker-js/faker"

import Event from "@src/classes/event"

function eventFactory(): Event {
  const url = "/pages/" + faker.animal.cat().replace(/ /g, "-").toLowerCase()
  const visitorId = faker.string.uuid()
  const timestamp = faker.date.anytime().getTime()
  const event = new Event({
    url,
    visitorId,
    timestamp
  })

  return event
}

export default eventFactory
