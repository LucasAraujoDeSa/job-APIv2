import {
  HashAdapterFake,
  EncrypterAdapterFake,
} from "@/../tests/shared/adapters";
import { LoginController } from "@/modules/account/application/controllers/login/login-controller";
import { Login } from "@/modules/account/domain/use-cases/login";
import {
  GetAccountByEmailRepositoryFake,
  UpdateAcessTokenRepositoryFake,
} from "../fakes";
import { LoginMock } from "../mocks";

const makeSut = () => {
  const getAccountByEmailRepositoryFake = new GetAccountByEmailRepositoryFake();
  const hashAdapterFake = new HashAdapterFake();
  const encrypterAdapterFake = new EncrypterAdapterFake();
  const updateAcessTokenRepositoryFake = new UpdateAcessTokenRepositoryFake();
  const login = new Login(
    getAccountByEmailRepositoryFake,
    hashAdapterFake,
    encrypterAdapterFake,
    updateAcessTokenRepositoryFake
  );
  const sut = new LoginController(login);
  return {
    sut,
  };
};

const params = LoginMock();

describe("==> login controller", () => {
  it("should 200 on success", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(params);

    expect(httpResponse.status_code).toEqual(200);
  });
});
