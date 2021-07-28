import { DbSignup } from "@/modules/user/use-cases/db-signup";
import { EmailValidatorFake } from "@/shared/adapters/email-validator-adapter/fake/email-validator-fake";
import { UserMock } from "../mocks/user-mock";

const params = UserMock();

const makeSut = () => {
  const emailValidatorFake = new EmailValidatorFake();
  const sut = new DbSignup(emailValidatorFake);
  return {
    sut,
    emailValidatorFake,
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
});
