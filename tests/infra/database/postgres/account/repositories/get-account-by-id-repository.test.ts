import {
  PostgresGetAccountByIdRepository,
  PostgresAddAccountRepository,
} from "@/infra/database/postgres/account/repositories";
import { AccountMock } from "@/../tests/modules/account/mocks/account-mock";
import { connection } from "@/infra/database/postgres";

const input = AccountMock();

const makeSut = () => {
  const sut = new PostgresGetAccountByIdRepository();
  const create_account = new PostgresAddAccountRepository();
  return {
    sut,
    create_account,
  };
};

describe("==> get-account-by-id-repository", () => {
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

    const { id } = await create_account.add(input);
    const account = await sut.get_account(id);

    expect(account?.name).toEqual(input.name);
    expect(account?.email).toEqual(input.email);
  });
});
