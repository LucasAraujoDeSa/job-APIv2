import faker from "faker";
import { AccountModel } from "@/modules/account/domain/models";

export const AccountMock = (): Omit<AccountModel, "id"> => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: "active",
  role: "user",
});
