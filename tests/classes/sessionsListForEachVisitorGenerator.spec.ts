import Input from "@src/classes/input"
import SessionsListForEachVisitorGenerator from "@src/classes/sessionsListForEachVisitorGenerator"

import inputObjectFactory from "../factories/inputObjectFactory"

const {
  getVisitorsFromEvents,
  getEventsByUser,
  getOrderedEventsByUser,
  getEventsSeparatedByUserSessions,
  getSessionsByUser
} = SessionsListForEachVisitorGenerator

describe('SessionsListForEachVisitorGenerator expectations', () => {
  it('should be able to use all static methods', () => {
    const inputObject = inputObjectFactory()
    const input = Input.fromObject(inputObject)

    const visitors = getVisitorsFromEvents(input)
    const eventsByUser = getEventsByUser(visitors, input)
    const orderedEventsByUser = getOrderedEventsByUser(visitors, eventsByUser)
    const eventsSeparatedByUserSessions = getEventsSeparatedByUserSessions(visitors, orderedEventsByUser)
    const sessionsByUser = getSessionsByUser(visitors, eventsSeparatedByUserSessions)

    expect(visitors).toBeTruthy()
    expect(eventsByUser).toBeTruthy()
    expect(orderedEventsByUser).toBeTruthy()
    expect(eventsSeparatedByUserSessions).toBeTruthy()
    expect(sessionsByUser).toBeTruthy()
  })
})
