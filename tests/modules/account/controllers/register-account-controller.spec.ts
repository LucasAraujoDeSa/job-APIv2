import { EmailValidatorAdapterFake } from "@/../tests/shared/adapters";
import { RegisterAccountController } from "@/modules/account/application/controllers/register-account/register-account-controller";
import { AccountMock } from "../mocks/account-mock";

const makeSut = () => {
  const emailValidatorAdapterFake = new EmailValidatorAdapterFake();
  const sut = new RegisterAccountController(emailValidatorAdapterFake);
  return {
    sut,
    emailValidatorAdapterFake,
  };
};

const params = AccountMock();

describe("==> register account controller", () => {
  it("should 400 if email format is invalid", async () => {
    const { sut, emailValidatorAdapterFake } = makeSut();

    jest
      .spyOn(emailValidatorAdapterFake, "isValid")
      .mockImplementationOnce(() => new Promise((reject) => reject(false)));
    const httpResponse = await sut.handle(params);

    expect(httpResponse.status_code).toEqual(400);
    expect(httpResponse.body).toEqual("Invalid email format");
  });
});
