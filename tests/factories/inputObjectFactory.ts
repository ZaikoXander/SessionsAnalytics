import { faker } from "@faker-js/faker"

import IInputObject from "@src/interfaces/input/inputObject"

import urlFactory from "./urlFactory"

function inputObjectFactory(): IInputObject {
  const visitors: string[] = []
  for (let i = 0; i < 3; i++) {
    visitors.push(faker.string.uuid())
  }

  const inputObject: IInputObject = {
    events: []
  }

  visitors.forEach(visitor => {
    const eventCountByUser = faker.number.int({
      min: 1,
      max: 3
    })

    for (let i = 0; i < eventCountByUser; i++) {
      const randomBoolean = faker.datatype.boolean(0.75)

      let lastVisitorEventTime = 0
      const twoMinutesInMilliseconds = 120000

      if (randomBoolean) {
        for (let i = inputObject.events.length - 1; i >= 0; i--) {
          if(inputObject.events[i].visitorId === visitor) {
            lastVisitorEventTime = inputObject.events[i].timestamp
            break
          }
        }
      }

      const timeBeforeExpirationOfSession = lastVisitorEventTime === 0 ? 0 : lastVisitorEventTime + twoMinutesInMilliseconds

      inputObject.events.push({
        visitorId: visitor,
        url: urlFactory(),
        timestamp: timeBeforeExpirationOfSession || faker.date.anytime().getTime()
      })
    }
  })

  return inputObject
}

export default inputObjectFactory
