import { AddAccountRepositoryContract } from "@/modules/account/domain/contracts/repositories";

export class AddAccountRepositoryFake implements AddAccountRepositoryContract {
  params: AddAccountRepositoryContract.Params;

  result: AddAccountRepositoryContract.Result;

  public async add(
    params: AddAccountRepositoryContract.Params
  ): Promise<AddAccountRepositoryContract.Result> {
    this.params = params;
    this.result = {
      id: "any_id",
      ...params,
    };

    return this.result;
  }
}
