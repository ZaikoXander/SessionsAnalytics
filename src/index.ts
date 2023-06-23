import Input from "./classes/input"
import Event from "./classes/event"
import EventByUser from "./classes/eventByUser"
import Session from "./classes/session"
import Output from "./classes/output"

import IInputObject from "./interfaces/input/inputObject"
import ISessionsByUser from "./interfaces/session/sessionsByUser"
import IOutputObject from "./interfaces/output/outputObject"

interface IEventsByUser {
  [key: string]: EventByUser[]
}

interface IEventsSeparatedByUserSessions {
  [key: string]: EventByUser[][]
}

class SessionsAnalytics {
  private input: Input

  constructor(input: Input) {
    this.input = input
  }

  public generateListOfSessionsForEachVisitor(): IOutputObject {
    const visitors: string[] = []
    this.input.events.forEach(event => {
      if (!visitors.includes(event.visitorId)) {
        visitors.push(event.visitorId)
      }
    })
  
    const eventsByUser: IEventsByUser = {}
    visitors.forEach(visitor => {
      const events: Event[] = this.input.events.filter(event => event.visitorId === visitor)

      eventsByUser[visitor] = events.map(({ url, timestamp }) => new EventByUser({ url, timestamp }))
    })

    const orderedEventsByUser: IEventsByUser = {}
    visitors.forEach(visitor => {
      orderedEventsByUser[visitor] = eventsByUser[visitor].sort((a, b) => a.timestamp - b.timestamp)
    })

    const tenMinutesInMilliseconds = 600000

    const eventsSeparatedByUserSessions: IEventsSeparatedByUserSessions = {}

    visitors.forEach(visitor => {
      for (let i = 0; i < orderedEventsByUser[visitor].length; i++) {
        const currentEventByUser = orderedEventsByUser[visitor][i]

        if (i === 0) {
          eventsSeparatedByUserSessions[visitor] = [[currentEventByUser]]
          continue
        }

        const lastEventByUserAdded = eventsSeparatedByUserSessions[visitor][0].at(-1)

        const timestampDifference = currentEventByUser.timestamp - lastEventByUserAdded!.timestamp

        if (timestampDifference <= tenMinutesInMilliseconds) {
          eventsSeparatedByUserSessions[visitor][0].push(currentEventByUser)
        } else {
          eventsSeparatedByUserSessions[visitor].push([currentEventByUser])
        }
      }
    })

    function createSessionByEvents(visitor: string, index: number): Session {
      const lastEventByUserTimestamp = eventsSeparatedByUserSessions[visitor][index].at(-1)!.timestamp
      const firstEventByUserTimestamp = eventsSeparatedByUserSessions[visitor][index][0].timestamp

      const duration = lastEventByUserTimestamp - firstEventByUserTimestamp
      const pages = eventsSeparatedByUserSessions[visitor][index].map(eventByUser => eventByUser.url)
      const startTime =  eventsSeparatedByUserSessions[visitor][index][0].timestamp

      const session = new Session({
        duration,
        pages,
        startTime
      })

      return session
    }

    const sessionsByUser: ISessionsByUser = {}

    visitors.forEach(visitor => {
      for (let i = 0; i < eventsSeparatedByUserSessions[visitor].length; i++) {
        const currentSessionByUser = createSessionByEvents(visitor, i)

        if (i === 0) {
          sessionsByUser[visitor] = [currentSessionByUser]
          continue
        }

        sessionsByUser[visitor].push(currentSessionByUser)
      }
    })

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

const output = sa.generateListOfSessionsForEachVisitor()

const formattedOutput = JSON.stringify(output, null, 2)

console.log(formattedOutput)
