import Input from "@src/classes/input"
import SessionsAnalytics from "@src/classes/sessionsAnalytics"

import inputObjectFactory from "../factories/inputObjectFactory"

describe('SessionsAnalytics expectations', () => {
  it('should be able to create a sessionsAnalytics instance', () => {
    const inputObject = inputObjectFactory()
    const input = Input.fromObject(inputObject)

    const sa = new SessionsAnalytics(input)

    expect(sa).toBeTruthy()
    expect(sa).toBeInstanceOf(SessionsAnalytics)
  })

  it('should be able to generate the output', () => {
    const inputObject = inputObjectFactory()
    const input = Input.fromObject(inputObject)

    const sa = new SessionsAnalytics(input)

    const output = sa.generateSessionsListForEachVisitor()

    expect(output).toBeTruthy()
    expect(output).not.toBe(input)
    expect(output.sessionsByUser).toBeTruthy()
  })
})
