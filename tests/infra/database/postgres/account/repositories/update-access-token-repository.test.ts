import {
  PostgresUpdateAcessTokenRepository,
  PostgresAddAccountRepository,
} from "@/infra/database/postgres/account/repositories";
import { AccountMock } from "@/../tests/modules/account/mocks/account-mock";
import { connection } from "@/infra/database/postgres";

const input = AccountMock();

const makeSut = () => {
  const sut = new PostgresUpdateAcessTokenRepository();
  const create_account = new PostgresAddAccountRepository();
  return {
    sut,
    create_account,
  };
};

describe("==> update-access-token-repository", () => {
  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("should update a account access token", async () => {
    const { sut, create_account } = makeSut();

    const created_account = await create_account.add(input);
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
    const account = await sut.update(created_account.id, token);

    expect(account?.access_token).toEqual(token);
  });
});
