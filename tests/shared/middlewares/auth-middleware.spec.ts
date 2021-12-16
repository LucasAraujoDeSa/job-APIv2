import { GetAccountByIdRepositoryFake } from "../../modules/account/fakes";
import { EncrypterAdapterFake } from "../adapters";
import { AuthMiddleware } from "@/shared/middlewares/auth-middleware";

const makeSut = () => {
  const encrypterAdapter = new EncrypterAdapterFake();
  const getAccountByIdRepository = new GetAccountByIdRepositoryFake();
  const sut = new AuthMiddleware(encrypterAdapter, getAccountByIdRepository);
  return {
    sut,
    encrypterAdapter,
    getAccountByIdRepository,
  };
};

describe("==> auth middleware", () => {
  it("should check if account is authenticated", async () => {
    const { sut } = makeSut();

    const access_token = { access_token: "123abc" };
    const auth = await sut.handle(access_token);

    expect(auth.body).toEqual("id");
  });
});
