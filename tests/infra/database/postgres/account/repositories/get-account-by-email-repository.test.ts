import { PostgresGetAccountByEmailRepository } from "@/infra/database/postgres/account/repositories/get-account-by-email-repository";
import { AccountMock } from "@/../tests/modules/account/mocks/account-mock";
import { connection } from "@/infra/database/postgres";
import { PostgresAddAccountRepository } from "@/infra/database/postgres/account/repositories";

const input = AccountMock();

const makeSut = () => {
  const sut = new PostgresGetAccountByEmailRepository();
  const create_account = new PostgresAddAccountRepository();
  return {
    sut,
    create_account,
  };
};

describe("==> get-account-by-email-repository", () => {
  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should return an account", async () => {
    const { sut, create_account } = makeSut();

    await create_account.add(input);
    const account = await sut.get_account(input.email);

    expect(account?.name).toEqual(input.name);
    expect(account?.email).toEqual(input.email);
  });
});
