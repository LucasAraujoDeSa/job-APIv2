import { Login } from "@/modules/account/domain/use-cases/login";
import { HashAdapterFake, EncrypterAdapterFake } from "@/tests/shared/adapters";
import { LoginMock } from "../mocks";
import {
  GetAccountByEmailRepositoryFake,
  UpdateAcessTokenRepositoryFake,
} from "../fakes";
import { ExceptionHandler } from "@/shared/application/errors/exception-handle";

const input = LoginMock();

const makeSut = () => {
  const getAccountByEmailRepositoryFake = new GetAccountByEmailRepositoryFake();
  const hashAdapterFake = new HashAdapterFake();
  const encrypterAdapterFake = new EncrypterAdapterFake();
  const updateAcessTokenRepositoryFake = new UpdateAcessTokenRepositoryFake();
  const sut = new Login(
    getAccountByEmailRepositoryFake,
    hashAdapterFake,
    encrypterAdapterFake,
    updateAcessTokenRepositoryFake
  );
  return {
    sut,
    getAccountByEmailRepositoryFake,
    hashAdapterFake,
    encrypterAdapterFake,
    updateAcessTokenRepositoryFake,
  };
};

describe("==> login", () => {
  it("should thow a error if account not exist", () => {
    const { getAccountByEmailRepositoryFake, sut } = makeSut();

    jest
      .spyOn(getAccountByEmailRepositoryFake, "get_account")
      .mockImplementationOnce(() => new Promise((reject) => reject(undefined)));

    expect(sut.login(input)).rejects.toEqual(
      new ExceptionHandler("email or password incorrect", 400)
    );
  });

  it("should thow a error if password incorrect", () => {
    const { hashAdapterFake, sut } = makeSut();

    jest
      .spyOn(hashAdapterFake, "compare")
      .mockImplementationOnce(() => new Promise((reject) => reject(false)));

    expect(sut.login(input)).rejects.toEqual(
      new ExceptionHandler("email or password incorrect", 400)
    );
  });

  it("should call encrypter adapter", async () => {
    const { encrypterAdapterFake, sut } = makeSut();

    const signSpy = jest.spyOn(encrypterAdapterFake, "sign");
    await sut.login(input);

    expect(signSpy).toHaveBeenCalled();
  });

  it("should call update access token", async () => {
    const { updateAcessTokenRepositoryFake, sut } = makeSut();

    const updateTokenSpy = jest.spyOn(updateAcessTokenRepositoryFake, "update");
    await sut.login(input);

    expect(updateTokenSpy).toHaveBeenCalled();
  });
});
