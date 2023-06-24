import Input from "./classes/input"
import Output from "./classes/output"
import SessionsListForEachVisitorGenerator from "./classes/sessionsListForEachVisitorGenerator"

import IInputObject from "./interfaces/input/inputObject"
import IOutputObject from "./interfaces/output/outputObject"

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

const input: IInputObject = {
  "events": [
    {
      "url": "/pages/a-big-river",
      "visitorId": "d1177368-2310-11e8-9e2a-9b860a0d9039",
      "timestamp": 1512754583000
    },
    {
      "url": "/pages/a-small-dog",
      "visitorId": "d1177368-2310-11e8-9e2a-9b860a0d9039",
      "timestamp": 1512754631000
    },
    {
      "url": "/pages/a-big-talk",
      "visitorId": "f877b96c-9969-4abc-bbe2-54b17d030f8b",
      "timestamp": 1512709065294
    },
    {
      "url": "/pages/a-sad-story",
      "visitorId": "f877b96c-9969-4abc-bbe2-54b17d030f8b",
      "timestamp": 1512711000000
    },
    {
      "url": "/pages/a-big-river",
      "visitorId": "d1177368-2310-11e8-9e2a-9b860a0d9039",
      "timestamp": 1512754436000
    },
    {
      "url": "/pages/a-sad-story",
      "visitorId": "f877b96c-9969-4abc-bbe2-54b17d030f8b",
      "timestamp": 1512709024000
    }
  ]
}

const sa = new SessionsAnalytics(Input.fromObject(input))

const output = sa.generateSessionsListForEachVisitor()

const formattedOutput = JSON.stringify(output, null, 2)

console.log(formattedOutput)
