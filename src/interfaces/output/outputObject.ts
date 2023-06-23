import ISessionByUserObject from "../session/sessionByUserObject"

interface IOutputObject {
  sessionsByUser: {
    [key: string]: ISessionByUserObject[]
  }
}

export default IOutputObject
