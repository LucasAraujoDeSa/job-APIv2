import { GetAccountByIdRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { AccountModel } from "@/modules/account/domain/models";
import { AccountMock } from "../mocks";

export class GetAccountByIdRepositoryFake
  implements GetAccountByIdRepositoryContract
{
  output = AccountMock();

  public async get_account(id: string): Promise<AccountModel | undefined> {
    return {
      ...this.output,
      id,
    };
  }
}
