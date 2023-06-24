import { faker } from "@faker-js/faker"

import Event from "@src/classes/event"

import urlFactory from "./urlFactory"

function eventFactory(): Event {
  const url = urlFactory()
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
