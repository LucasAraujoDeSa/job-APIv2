import { UpdateAcessTokenContract } from "@/modules/account/domain/contracts/repositories";
import { AccountMock } from "../mocks";
import { AccountModel } from "@/modules/account/domain/models";

export class UpdateAcessTokenFake implements UpdateAcessTokenContract {
  output = AccountMock();

  public async update(id: string, token: string): Promise<AccountModel> {
    return {
      ...this.output,
      id,
      access_token: token,
    };
  }
}
