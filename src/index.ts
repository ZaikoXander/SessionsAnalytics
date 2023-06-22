import EventByUser from "./eventByUser"

interface IEvent {
  url: string
  visitorId: string
  timestamp: number
}

interface IInput {
  events: IEvent[]
}

interface IEventsByUser {
  [key: string]: EventByUser[]
}

interface ISession {
  duration: number
  pages: string[]
  startTime: number
}

interface IOutput {
  sessionsByUser: {
    [key: string]: ISession[]
  }
}

class SessionsAnalytics {
  private input: IInput

  constructor(input: IInput) {
    this.input = input
  }

  public generateListOfSessionsForEachVisitor(): void | IOutput {
    const visitors: string[] = []
    this.input.events.forEach(event => {
      if (!visitors.includes(event.visitorId)) {
        visitors.push(event.visitorId)
      }
    })
  
    const eventsByUser: IEventsByUser = {}
    visitors.forEach(visitor => {
      const events: IEvent[] = this.input.events.filter(event => event.visitorId === visitor)
  
      eventsByUser[visitor] = events.map(({ url, timestamp }) => new EventByUser({ url, timestamp }))
    })

    const orderedEventsByUser: IEventsByUser = {}
    visitors.forEach(visitor => {
      orderedEventsByUser[visitor] = eventsByUser[visitor].sort((a, b) => a.timestamp - b.timestamp)
    })

    interface IEventsSeparatedByUserSessions {
      [key: string]: EventByUser[][]
    }

    const eventsSeparatedByUserSessions: IEventsSeparatedByUserSessions = {}

    const tenMinutesInMilliseconds = 600000

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

    console.log(JSON.stringify(eventsSeparatedByUserSessions, null, 2))
  }
}

const input: IInput = {
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

const sa = new SessionsAnalytics(input)

sa.generateListOfSessionsForEachVisitor()
// Desses dados nós temos que gerar uma lista de sessões para cada visitante.

const output: IOutput = {
  /**
   * A sessions is defined as a group of events from a single visitor
   * with no more than 10 minutes between each consecutive event.
   */
  "sessionsByUser": {
    "f877b96c-9969-4abc-bbe2-54b17d030f8b": [
      {
        "duration": 41294,
        "pages": [
          "/pages/a-sad-story",
          "/pages/a-big-talk"
        ],
        "startTime": 1512709024000
      },
      /**
       * finalTime = startTime + duration
       * finalTime === 1512709065294
       * A visitor can have multiple sessions.
       */
      {
        "duration": 0,
        "pages": [
          "/pages/a-sad-story"
        ],
        "startTime": 1512711000000
      }
      /**
       * previousSessionFinalTime === 1512709065294
       * difference = 1512711000000 - previousSessionFinalTime
       * if (difference > 600000) => createNewSession
       */
    ],
    "d1177368-2310-11e8-9e2a-9b860a0d9039": [
      {
        "duration": 195000,
        /**
         * duration = 1512754436000(evento mais recente) - 1512754436000(evento mais antigo)
         */
        "pages": [
          "/pages/a-big-river",
          "/pages/a-big-river",
          "/pages/a-small-dog"
        ],
        "startTime": 1512754436000
      }
    ]
  }
}
