import Input from "@src/classes/input"
import SessionsAnalytics from "@src/classes/sessionsAnalytics"

import IInputObject from "@src/interfaces/input/inputObject"
import IOutputObject from "@src/interfaces/output/outputObject"

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

  it('should be able to generate a valid output', () => {
    const inputObject: IInputObject = {
      events: [
        {
          url: '/pages/lapermb',
          visitorId: '0e88dc07-e2ed-4c79-b113-deb47f85d7ef',
          timestamp: 1718798561100
        },
        {
          url: '/pages/siberiand',
          visitorId: '788274eb-d1e4-41ff-b7c5-a5ceb2462255',
          timestamp: 1675632919572
        },
        {
          url: '/pages/lapermc',
          visitorId: '0e88dc07-e2ed-4c79-b113-deb47f85d7ef',
          timestamp: 1718799171100
        },
        {
          url: '/pages/siberiana',
          visitorId: '0a2633b9-e283-4bdf-8afc-4c4449c739c3',
          timestamp: 1657854184492
        },
        {
          url: '/pages/siberianc',
          visitorId: '788274eb-d1e4-41ff-b7c5-a5ceb2462255',
          timestamp: 1675632309572
        },
        {
          url: '/pages/siberianc',
          visitorId: '0a2633b9-e283-4bdf-8afc-4c4449c739c3',
          timestamp: 1657855384492
        },
        {
          url: '/pages/siberianb',
          visitorId: '788274eb-d1e4-41ff-b7c5-a5ceb2462255',
          timestamp: 1675631719572
        },
        {
          url: '/pages/laperma',
          visitorId: '0e88dc07-e2ed-4c79-b113-deb47f85d7ef',
          timestamp: 1718797951100
        },
        {
          url: '/pages/siberiana',
          visitorId: '788274eb-d1e4-41ff-b7c5-a5ceb2462255',
          timestamp: 1675631129572
        },
        {
          url: '/pages/lapermd',
          visitorId: '0e88dc07-e2ed-4c79-b113-deb47f85d7ef',
          timestamp: 1718799761100
        },
        {
          url: '/pages/siberianb',
          visitorId: '0a2633b9-e283-4bdf-8afc-4c4449c739c3',
          timestamp: 1657854774492
        }
      ]
    }

    const input = Input.fromObject(inputObject)
    const sa = new SessionsAnalytics(input)
    
    const expectedOutput: IOutputObject = {
      sessionsByUser: {
        '0e88dc07-e2ed-4c79-b113-deb47f85d7ef': [
          {
            'duration': 0,
            'pages': [
              '/pages/laperma'
            ],
            'startTime': 1718797951100
          },
          {
            'duration': 0,
            'pages': [
              '/pages/lapermb'
            ],
            'startTime': 1718798561100
          },
          {
            'duration': 590000,
            'pages': [
              '/pages/lapermc',
              '/pages/lapermd'
            ],
            'startTime': 1718799171100
          }
        ],
        '0a2633b9-e283-4bdf-8afc-4c4449c739c3': [
          {
            'duration': 590000,
            'pages': [
              '/pages/siberiana',
              '/pages/siberianb'
            ],
            'startTime': 1657854184492
          },
          {
            'duration': 0,
            'pages': [
              '/pages/siberianc'
            ],
            'startTime': 1657855384492
          }
        ],
        '788274eb-d1e4-41ff-b7c5-a5ceb2462255': [
          {
            'duration': 1180000,
            'pages': [
              '/pages/siberiana',
              '/pages/siberianb',
              '/pages/siberianc'
            ],
            'startTime': 1675631129572
          },
          {
            'duration': 0,
            'pages': [
              '/pages/siberiand'
            ],
            'startTime': 1675632919572
          }
        ]
      }
    }

    const output = sa.generateSessionsListForEachVisitor()

    expect(output).toBeTruthy()
    expect(output).not.toBe(input)
    expect(output).toStrictEqual(expectedOutput)
  })
})
