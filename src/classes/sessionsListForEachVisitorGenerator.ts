import Input from "./input"
import Event from "./event"
import EventByUser from "./eventByUser"
import Session from "./session"

import ISessionsByUser from "../interfaces/session/sessionsByUser"

interface IEventsByUser {
  [key: string]: EventByUser[]
}

interface IEventsSeparatedByUserSessions {
  [key: string]: EventByUser[][]
}

class SessionsListForEachVisitorGenerator {
  public static getVisitorsFromEvents(input: Input): string[] {
    const visitors: string[] = []
    input.events.forEach(event => {
      const isVisitorAlreadyAdded = visitors.findIndex(visitor => visitor === event.visitorId) !== -1 ? true : false
  
      if (!isVisitorAlreadyAdded) {
        visitors.push(event.visitorId)
      }
    })
  
    return visitors
  }
  
  public static getEventsByUser(visitors: string[], input: Input): IEventsByUser {
    const eventsByUser: IEventsByUser = {}
    visitors.forEach(visitor => {
      const events: Event[] = input.events.filter(event => event.visitorId === visitor)
  
      eventsByUser[visitor] = events.map(({
        url,
        timestamp
      }) => new EventByUser({ url, timestamp }))
    })
  
    return eventsByUser
  }
  
  public static getOrderedEventsByUser(visitors: string[], eventsByUser: IEventsByUser): IEventsByUser {
    const orderedEventsByUser: IEventsByUser = {}
    visitors.forEach(visitor => {
      orderedEventsByUser[visitor] = eventsByUser[visitor].sort((a, b) => a.timestamp - b.timestamp)
    })
  
    return orderedEventsByUser
  }
  
  public static getEventsSeparatedByUserSessions(visitors: string[], orderedEventsByUser: IEventsByUser): IEventsSeparatedByUserSessions {
    const tenMinutesInMilliseconds = 600000
  
    const eventsSeparatedByUserSessions: IEventsSeparatedByUserSessions = {}
    visitors.forEach(visitor => {
      for (let i = 0; i < orderedEventsByUser[visitor].length; i++) {
        const currentEventByUser = orderedEventsByUser[visitor][i]
  
        if (i === 0) {
          eventsSeparatedByUserSessions[visitor] = [[currentEventByUser]]
          continue
        }
  
        const lastEventByUserAdded = eventsSeparatedByUserSessions[visitor].at(-1)!.at(-1)!
  
        const timestampDifference = currentEventByUser.timestamp - lastEventByUserAdded.timestamp

        if (timestampDifference <= tenMinutesInMilliseconds) {
          eventsSeparatedByUserSessions[visitor].at(-1)!.push(currentEventByUser)
        } else {
          eventsSeparatedByUserSessions[visitor].push([currentEventByUser])
        }
      }
    })

    return eventsSeparatedByUserSessions
  }
  
  public static getSessionsByUser(visitors: string[], eventsSeparatedByUserSessions: IEventsSeparatedByUserSessions): ISessionsByUser {
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
  
    return sessionsByUser
  }
}

export default SessionsListForEachVisitorGenerator
