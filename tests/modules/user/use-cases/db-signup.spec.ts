import { DbSignup } from "@/modules/user/use-cases/db-signup";
import { EmailValidatorFake } from "@/tests/shared/adapters";
import { UserMock } from "../mocks/user-mock";
import { CheckByEmailFake } from "../fakes";

const params = UserMock();

const makeSut = () => {
  const emailValidatorFake = new EmailValidatorFake();
  const checkByEmailFake = new CheckByEmailFake();
  const sut = new DbSignup(emailValidatorFake, checkByEmailFake);
  return {
    sut,
    emailValidatorFake,
    checkByEmailFake,
  };
};

describe("==> signup", () => {
  it("should call signup with correct values", async () => {
    const { sut } = makeSut();

    const user = await sut.add(params);

    expect(user.name).toEqual(params.name);
    expect(user.email).toEqual(params.email);
  });

  it("should throw a error if email format is invalid", async () => {
    const { sut, emailValidatorFake } = makeSut();

    jest
      .spyOn(emailValidatorFake, "isValid")
      .mockImplementationOnce(() => new Promise((reject) => reject(false)));

    expect(
      sut.add({
        ...params,
        email: "invalid_email",
      })
    ).rejects.toEqual(new Error("invalid email format"));
  });

  it("should throw a error if email already in use", async () => {
    const { sut, checkByEmailFake } = makeSut();

    jest
      .spyOn(checkByEmailFake, "ifAlreadyInUse")
      .mockImplementationOnce(() => new Promise((reject) => reject(true)));

    expect(
      sut.add({
        ...params,
      })
    ).rejects.toEqual(new Error("email already in use"));
  });
});
