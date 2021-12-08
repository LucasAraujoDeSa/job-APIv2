import { RegisterAccount } from "@/modules/account/domain/use-cases/register-account/register-account";
import { HashAdapterFake, SmtpAdapterFake } from "@/tests/shared/adapters";
import { ExceptionHandler } from "@/shared/application/errors/exception-handle";
import { AccountMock } from "../mocks/account-mock";
import { CheckByEmailRepositoryFake, AddAccountRepositoryFake } from "../fakes";

const input = AccountMock();

const makeSut = () => {
  const checkByEmailRepositoryFake = new CheckByEmailRepositoryFake();
  const hashAdapterFake = new HashAdapterFake();
  const addAccountRepositoryFake = new AddAccountRepositoryFake();
  const smtpAdapterFake = new SmtpAdapterFake();
  const sut = new RegisterAccount(
    checkByEmailRepositoryFake,
    hashAdapterFake,
    addAccountRepositoryFake,
    smtpAdapterFake
  );
  return {
    sut,
    checkByEmailRepositoryFake,
    hashAdapterFake,
    addAccountRepositoryFake,
    smtpAdapterFake,
  };
};

describe("==> register account", () => {
  it("should throw a error if email already in use", () => {
    const { sut, checkByEmailRepositoryFake } = makeSut();

    jest
      .spyOn(checkByEmailRepositoryFake, "ifAlreadyInUse")
      .mockImplementationOnce(() => new Promise((reject) => reject(true)));

    expect(
      sut.add({
        ...input,
      })
    ).rejects.toEqual(new ExceptionHandler("Email already in use", 400));
  });

  it("should return a hashedPassword if hashAdapter success", async () => {
    const { sut, hashAdapterFake } = makeSut();

    const user = await sut.add({
      ...input,
    });

    expect(user.password).toEqual(hashAdapterFake.hashedplaintext);
  });

  it("should call smtpAdapter", async () => {
    const { sut, smtpAdapterFake } = makeSut();

    const user = await sut.add(input);

    expect(smtpAdapterFake.input).toEqual({
      id: user.id,
      email: user.email,
    });
  });

  it("should return a newAccount if success", async () => {
    const { sut, addAccountRepositoryFake } = makeSut();

    const user = await sut.add(input);

    expect(user).toEqual(addAccountRepositoryFake.output);
  });
});
