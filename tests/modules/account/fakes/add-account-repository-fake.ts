import { AddAccountRepositoryContract } from "@/modules/account/domain/contracts/repositories";

export class AddAccountRepositoryFake implements AddAccountRepositoryContract {
  input: AddAccountRepositoryContract.Input;

  output: AddAccountRepositoryContract.Output;

  public async add(
    input: AddAccountRepositoryContract.Input
  ): Promise<AddAccountRepositoryContract.Output> {
    this.input = input;
    this.output = {
      id: "any_id",
      ...input,
    };

    return this.output;
  }
}
