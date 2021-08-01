import { DbSignup } from "@/modules/user/use-cases/db-signup";
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
  const sut = new DbSignup(
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
  it("should call signup with correct values", async () => {
    const { sut } = makeSut();

    const user = await sut.add(params);

    expect(user.name).toEqual(params.name);
    expect(user.email).toEqual(params.email);
  });

  it("should call emailValidator with correct values", async () => {
    const { sut, emailValidatorAdapterFake } = makeSut();

    await sut.add({
      ...params,
    });

    expect(emailValidatorAdapterFake.email).toEqual(params.email);
  });

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

  it("should call checkByEmail with correct values", async () => {
    const { sut, checkByEmailRepositoryFake } = makeSut();

    await sut.add({
      ...params,
    });

    expect(checkByEmailRepositoryFake.email).toEqual(params.email);
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

  it("should call hashAdapter with correct values", async () => {
    const { sut, hashAdapterFake } = makeSut();

    await sut.add({
      ...params,
    });

    expect(hashAdapterFake.plaintext).toEqual(params.password);
  });

  it("should return a hashedPassword if hashAdapter success", async () => {
    const { sut, hashAdapterFake } = makeSut();

    const user = await sut.add({
      ...params,
    });

    expect(user.password).toEqual(hashAdapterFake.hashedplaintext);
  });

  it("should call addAccountRepository with correct values", async () => {
    const { sut, hashAdapterFake, addAccountRepositoryFake } = makeSut();

    await sut.add(params);

    expect(addAccountRepositoryFake.params).toEqual({
      ...params,
      password: hashAdapterFake.hashedplaintext,
    });
  });

  it("should return a newAccount if addAccountRepository success", async () => {
    const { sut, addAccountRepositoryFake } = makeSut();

    const user = await sut.add(params);

    expect(addAccountRepositoryFake.result).toEqual(user);
  });

  it("should smtpAdapter with correct values", async () => {
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
