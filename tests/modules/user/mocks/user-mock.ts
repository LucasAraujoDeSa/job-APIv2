import faker from "faker";
import { UserModel } from "../domain/models";

export const UserMock = (): Omit<UserModel, "id"> => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: "active",
  role: "user",
});
