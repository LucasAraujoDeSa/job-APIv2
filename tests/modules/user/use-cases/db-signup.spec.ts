import { DbSignup } from "@/modules/user/use-cases/db-signup";
import { UserMock } from "../mocks/user-mock";

const params = UserMock();

const makeSut = () => {
  const sut = new DbSignup();
  return {
    sut,
  };
};

describe("==> signup", () => {
  it("should call signup with correct values", async () => {
    const { sut } = makeSut();

    const user = await sut.add(params);

    expect(user.name).toEqual(params.name);
    expect(user.email).toEqual(params.email);
  });
});
