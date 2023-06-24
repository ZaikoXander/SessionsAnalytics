import Input from "@src/classes/input"
import Output from "@src/classes/output"
import SessionsListForEachVisitorGenerator from "@src/classes/sessionsListForEachVisitorGenerator"

import IOutputObject from "@src/interfaces/output/outputObject"

import inputObjectFactory from "../factories/inputObjectFactory"

const {
  getVisitorsFromEvents,
  getEventsByUser,
  getOrderedEventsByUser,
  getEventsSeparatedByUserSessions,
  getSessionsByUser
} = SessionsListForEachVisitorGenerator

describe('Output expectations', () => {
  it('should be able to create a output', () => {
    const inputObject = inputObjectFactory()
    const input = Input.fromObject(inputObject)
    const visitors = getVisitorsFromEvents(input)
    const eventsByUser = getEventsByUser(visitors, input)
    const orderedEventsByUser = getOrderedEventsByUser(visitors, eventsByUser)
    const eventsSeparatedByUserSessions = getEventsSeparatedByUserSessions(visitors, orderedEventsByUser)
    const sessionsByUser = getSessionsByUser(visitors, eventsSeparatedByUserSessions)
    const output = new Output(sessionsByUser)

    expect(output).toBeTruthy()
    expect(output).toBeInstanceOf(Output)
  })

  describe('OutputToObject expectations', () => {
    const inputObject = inputObjectFactory()
    const input = Input.fromObject(inputObject)
    const visitors = getVisitorsFromEvents(input)
    const eventsByUser = getEventsByUser(visitors, input)
    const orderedEventsByUser = getOrderedEventsByUser(visitors, eventsByUser)
    const eventsSeparatedByUserSessions = getEventsSeparatedByUserSessions(visitors, orderedEventsByUser)
    const sessionsByUser = getSessionsByUser(visitors, eventsSeparatedByUserSessions)
    const output = new Output(sessionsByUser)

    it('should be able to get output in common object format', () => {
      const outputToObject = output.toObject()
  
      const expectedOutputToObject: IOutputObject = {
        sessionsByUser: {}
      }
      visitors.forEach(visitor => {
        for (let i = 0; i < sessionsByUser[visitor].length; i++) {
          const currentSessionByUser = sessionsByUser[visitor][i].toObject()
  
          if (i === 0) {
            expectedOutputToObject.sessionsByUser[visitor] = [currentSessionByUser]
            continue
          }
  
          expectedOutputToObject.sessionsByUser[visitor].push(currentSessionByUser)
        }
      })
  
      expect(outputToObject).toBeTruthy()
      expect(outputToObject).not.toBe(output)
      expect(outputToObject).toStrictEqual(expectedOutputToObject)
    })
  
    it('should be able to get outputToObject properties', () => {
      const outputToObject = output.toObject()

      expect(outputToObject.sessionsByUser).toBeTruthy()
      visitors.forEach(visitor => {
        expect(outputToObject.sessionsByUser[visitor]).toBeTruthy()
        expect(outputToObject.sessionsByUser[visitor]).toStrictEqual(sessionsByUser[visitor].map(session => session.toObject()))
      })
    })
  })
})
