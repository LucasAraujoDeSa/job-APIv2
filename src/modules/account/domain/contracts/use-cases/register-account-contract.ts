import { AccountModel } from "../../models/account-model";

export interface RegisterAccountContract {
  add(
    params: RegisterAccountContract.Params
  ): Promise<RegisterAccountContract.Result>;
}

export namespace RegisterAccountContract {
  export type Params = Omit<AccountModel, "id">;
  export type Result = AccountModel;
}
