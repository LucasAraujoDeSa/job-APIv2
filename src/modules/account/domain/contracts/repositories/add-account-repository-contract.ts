import { AccountModel } from "../../models";

export interface AddAccountRepositoryContract {
  add(
    params: AddAccountRepositoryContract.Params
  ): Promise<AddAccountRepositoryContract.Result>;
}

export namespace AddAccountRepositoryContract {
  export type Params = Omit<AccountModel, "id">;
  export type Result = AccountModel;
}
