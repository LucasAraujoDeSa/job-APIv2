import { RegisterAccount } from "@/modules/account/application/register-account/register-account";
import {
  EmailValidatorAdapterFake,
  HashAdapterFake,
  SmtpAdapterFake,
} from "@/tests/shared/adapters";
import { UserMock } from "../mocks/user-mock";
import { CheckByEmailRepositoryFake, AddAccountRepositoryFake } from "../fakes";

const params = UserMock();

const makeSut = () => {
  const emailValidatorAdapterFake = new EmailValidatorAdapterFake();
  const checkByEmailRepositoryFake = new CheckByEmailRepositoryFake();
  const hashAdapterFake = new HashAdapterFake();
  const addAccountRepositoryFake = new AddAccountRepositoryFake();
  const smtpAdapterFake = new SmtpAdapterFake();
  const sut = new RegisterAccount(
    emailValidatorAdapterFake,
    checkByEmailRepositoryFake,
    hashAdapterFake,
    addAccountRepositoryFake,
    smtpAdapterFake
  );
  return {
    sut,
    emailValidatorAdapterFake,
    checkByEmailRepositoryFake,
    hashAdapterFake,
    addAccountRepositoryFake,
    smtpAdapterFake,
  };
};

describe("==> signup", () => {
  it("should throw a error if email format is invalid", async () => {
    const { sut, emailValidatorAdapterFake } = makeSut();

    jest
      .spyOn(emailValidatorAdapterFake, "isValid")
      .mockImplementationOnce(() => new Promise((reject) => reject(false)));

    expect(
      sut.add({
        ...params,
        email: "invalid_email",
      })
    ).rejects.toEqual(new Error("invalid email format"));
  });

  it("should throw a error if email already in use", async () => {
    const { sut, checkByEmailRepositoryFake } = makeSut();

    jest
      .spyOn(checkByEmailRepositoryFake, "ifAlreadyInUse")
      .mockImplementationOnce(() => new Promise((reject) => reject(true)));

    expect(
      sut.add({
        ...params,
      })
    ).rejects.toEqual(new Error("email already in use"));
  });

  it("should return a hashedPassword if hashAdapter success", async () => {
    const { sut, hashAdapterFake } = makeSut();

    const user = await sut.add({
      ...params,
    });

    expect(user.password).toEqual(hashAdapterFake.hashedplaintext);
  });

  it("should call smtpAdapter", async () => {
    const { sut, smtpAdapterFake } = makeSut();

    const user = await sut.add(params);

    expect(smtpAdapterFake.params).toEqual({
      id: user.id,
      email: user.email,
    });
  });

  it("should return a newAccount if success", async () => {
    const { sut, addAccountRepositoryFake } = makeSut();

    const user = await sut.add(params);

    expect(user).toEqual(addAccountRepositoryFake.result);
  });
});
