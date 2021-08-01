import { DbSignup } from "@/modules/user/use-cases/db-signup";
import { EmailValidatorFake, HashAdapterFake } from "@/tests/shared/adapters";
import { UserMock } from "../mocks/user-mock";
import { CheckByEmailFake } from "../fakes";

const params = UserMock();

const makeSut = () => {
  const emailValidatorFake = new EmailValidatorFake();
  const checkByEmailFake = new CheckByEmailFake();
  const hashAdapterFake = new HashAdapterFake();
  const sut = new DbSignup(
    emailValidatorFake,
    checkByEmailFake,
    hashAdapterFake
  );
  return {
    sut,
    emailValidatorFake,
    checkByEmailFake,
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
    const { sut, emailValidatorFake } = makeSut();

    await sut.add({
      ...params,
    });

    expect(emailValidatorFake.email).toEqual(params.email);
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

  it("should call checkByEmail with correct values", async () => {
    const { sut, checkByEmailFake } = makeSut();

    await sut.add({
      ...params,
    });

    expect(checkByEmailFake.email).toEqual(params.email);
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
