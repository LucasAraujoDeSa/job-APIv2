import faker from "faker"

export const UserMock = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: "active",
  role: "user"
})
