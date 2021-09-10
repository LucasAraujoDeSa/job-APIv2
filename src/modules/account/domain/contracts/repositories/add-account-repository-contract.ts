import { AccountModel } from "../../models";

export interface AddAccountRepositoryContract {
  add(
    input: AddAccountRepositoryContract.Input
  ): Promise<AddAccountRepositoryContract.Output>;
}

export namespace AddAccountRepositoryContract {
  export type Input = Omit<AccountModel, "id">;
  export type Output = AccountModel;
}
