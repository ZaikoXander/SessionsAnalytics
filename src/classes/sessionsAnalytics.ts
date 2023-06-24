import Input from "./input"
import Output from "./output"
import SessionsListForEachVisitorGenerator from "./sessionsListForEachVisitorGenerator"

import IOutputObject from "../interfaces/output/outputObject"

const {
  getVisitorsFromEvents,
  getEventsByUser,
  getOrderedEventsByUser,
  getEventsSeparatedByUserSessions,
  getSessionsByUser
} = SessionsListForEachVisitorGenerator

class SessionsAnalytics {
  private input: Input

  constructor(input: Input) {
    this.input = input
  }

  public generateSessionsListForEachVisitor(): IOutputObject {
    const visitors = getVisitorsFromEvents(this.input)
    const eventsByUser = getEventsByUser(visitors, this.input)
    const orderedEventsByUser = getOrderedEventsByUser(visitors, eventsByUser)
    const eventsSeparatedByUserSessions = getEventsSeparatedByUserSessions(visitors, orderedEventsByUser)
    const sessionsByUser = getSessionsByUser(visitors, eventsSeparatedByUserSessions)
    const output = new Output(sessionsByUser)

    return output.toObject()
  }
}

export default SessionsAnalytics
