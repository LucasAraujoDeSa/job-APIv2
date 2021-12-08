import faker from "faker";
import { LoginContract } from "@/modules/account/domain/contracts/use-cases";

export const LoginMock = (): LoginContract.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
