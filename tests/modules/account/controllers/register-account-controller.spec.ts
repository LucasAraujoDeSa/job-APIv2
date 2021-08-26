import {
  EmailValidatorAdapterFake,
  HashAdapterFake,
  SmtpAdapterFake,
} from "@/../tests/shared/adapters";
import { RegisterAccountController } from "@/modules/account/application/controllers/register-account/register-account-controller";
import { RegisterAccount } from "@/modules/account/domain/use-cases/register-account/register-account";
import { AddAccountRepositoryFake, CheckByEmailRepositoryFake } from "../fakes";
import { AccountMock } from "../mocks/account-mock";

const makeSut = () => {
  const emailValidatorAdapterFake = new EmailValidatorAdapterFake();
  const checkByEmailRepositoryFake = new CheckByEmailRepositoryFake();
  const hashAdapterFake = new HashAdapterFake();
  const addAccountRepositoryFake = new AddAccountRepositoryFake();
  const smtpAdapterFake = new SmtpAdapterFake();
  const registerAccount = new RegisterAccount(
    checkByEmailRepositoryFake,
    hashAdapterFake,
    addAccountRepositoryFake,
    smtpAdapterFake
  );
  const sut = new RegisterAccountController(
    emailValidatorAdapterFake,
    registerAccount
  );
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

  it("should 400 if fields is missing", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({
      ...params,
      email: "",
    });

    expect(httpResponse.status_code).toEqual(400);
  });

  it("should 201 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(params);

    expect(httpResponse.status_code).toEqual(201);
  });
});
