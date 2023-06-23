import Session from "../../classes/session"

interface ISessionsByUser {
  [key: string]: Session[]
}

export default ISessionsByUser
