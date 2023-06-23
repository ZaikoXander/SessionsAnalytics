import IOutputObject from "../interfaces/output/outputObject"
import ISessionsByUser from "../interfaces/session/sessionsByUser"

class Output {
  private _sessionsByUser: ISessionsByUser

  constructor(sessionsByUser: ISessionsByUser) {
    this._sessionsByUser = sessionsByUser
  }

  private getVisitors(sessionsByUser: ISessionsByUser): string[] {
    return Object.keys(sessionsByUser)
  }

  public toObject(): IOutputObject {
    const visitors = this.getVisitors(this._sessionsByUser)
    const outputObject: IOutputObject = { sessionsByUser: {} }

    visitors.forEach(visitor => {
      for (let i = 0; i < this._sessionsByUser[visitor].length; i++) {
        const currentSessionByUser = this._sessionsByUser[visitor][i].toObject()

        if (i === 0) {
          outputObject.sessionsByUser[visitor] = [currentSessionByUser]
          continue
        }

        outputObject.sessionsByUser[visitor].push(currentSessionByUser)
      }
    })

    return outputObject
  }
}

export default Output
