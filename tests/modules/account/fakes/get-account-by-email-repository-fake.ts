import { GetAccountByEmailRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { AccountModel } from "@/modules/account/domain/models";
import { AccountMock } from "../mocks";

export class GetAccountByEmailRepositoryFake
  implements GetAccountByEmailRepositoryContract
{
  output = AccountMock();

  public async get_account(email: string): Promise<AccountModel | undefined> {
    return {
      ...this.output,
      id: "1",
      email,
    };
  }
}
