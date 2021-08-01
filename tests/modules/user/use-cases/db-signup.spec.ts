import { DbSignup } from "@/modules/user/use-cases/db-signup";
import {
  EmailValidatorAdapterFake,
  HashAdapterFake,
} from "@/tests/shared/adapters";
import { UserMock } from "../mocks/user-mock";
import { CheckByEmailRepositoryFake } from "../fakes";

const params = UserMock();

const makeSut = () => {
  const emailValidatorAdapterFake = new EmailValidatorAdapterFake();
  const checkByEmailRepositoryFake = new CheckByEmailRepositoryFake();
  const hashAdapterFake = new HashAdapterFake();
  const sut = new DbSignup(
    emailValidatorAdapterFake,
    checkByEmailRepositoryFake,
    hashAdapterFake
  );
  return {
    sut,
    emailValidatorAdapterFake,
    checkByEmailRepositoryFake,
    hashAdapterFake,
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
});
