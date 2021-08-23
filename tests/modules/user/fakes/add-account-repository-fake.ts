import { AddAccountRepository } from "@/modules/user/repositories";

export class AddAccountRepositoryFake implements AddAccountRepository {
  params: AddAccountRepository.Params;

  result: AddAccountRepository.Result;

  public async add(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    this.params = params;
    this.result = {
      id: "any_id",
      ...params,
    };

    return this.result;
  }
}
