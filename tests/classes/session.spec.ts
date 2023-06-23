import { faker } from "@faker-js/faker"

import Session from "@src/classes/session"
import ISessionByUserObject from "@src/interfaces/session/sessionByUserObject"

describe('Session expectations', () => {
  it('should be able to create a session', () => {
    const pageCount = faker.number.int({
      min: 2,
      max: 5
    })
    const pages: string[] = []
    for (let i = 0; i < pageCount; i++) {
      const page = "/pages/" + faker.animal.cat().replace(/ /g, "-").toLowerCase()

      pages.push(page)
    }

    const firstTimestamp = faker.date.anytime().getTime()
    const twoMinutesInMilliseconds = 120000
    const additionalMilliseconds = faker.number.int(999)
    const lastTimestamp = firstTimestamp + ((twoMinutesInMilliseconds + additionalMilliseconds) * pageCount)

    const duration = lastTimestamp - firstTimestamp

    const session = new Session({
      duration,
      pages,
      startTime: firstTimestamp
    })

    expect(session).toBeTruthy()
    expect(session).toBeInstanceOf(Session)
  })

  describe('SessionToObject expectations', () => {
    const pageCount = faker.number.int({
      min: 2,
      max: 5
    })

    const pages: string[] = []
    for (let i = 0; i < pageCount; i++) {
      const page = "/pages/" + faker.animal.cat().replace(/ /g, "-").toLowerCase()

      pages.push(page)
    }

    const firstTimestamp = faker.date.anytime().getTime()
    const twoMinutesInMilliseconds = 120000
    const additionalMilliseconds = faker.number.int(999)
    const lastTimestamp = firstTimestamp + ((twoMinutesInMilliseconds + additionalMilliseconds) * pageCount)

    const duration = lastTimestamp - firstTimestamp

    const session = new Session({
      duration,
      pages,
      startTime: firstTimestamp
    })

    it('should be able to get session in common object format', () => {
      const sessionToObject = session.toObject()
  
      const expectedSessionToObject: ISessionByUserObject = {
        duration,
        pages,
        startTime: firstTimestamp,
      }

      expect(sessionToObject).toBeTruthy()
      expect(sessionToObject).not.toBe(session)
      expect(sessionToObject).toStrictEqual(expectedSessionToObject)
    })

    it('should be get sessionToObject properties', () => {
      const sessionToObject = session.toObject()
      
      expect(sessionToObject.duration).toBeTruthy()
      expect(sessionToObject.duration).toBe(duration)

      expect(sessionToObject.pages).toBeTruthy()
      expect(sessionToObject.pages).toBe(pages)

      expect(sessionToObject.startTime).toBeTruthy()
      expect(sessionToObject.startTime).toBe(firstTimestamp)
    })
  })
})
