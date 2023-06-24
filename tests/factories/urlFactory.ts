import { faker } from "@faker-js/faker"

function urlFactory(): string {
  const url = "/pages/" + faker.animal.cat().replace(/ /g, "-").toLowerCase()

  return url
}

export default urlFactory
