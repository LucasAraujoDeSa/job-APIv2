import { AccountModel } from "../../models/account-model";

export interface RegisterAccountContract {
  add(
    input: RegisterAccountContract.Input
  ): Promise<RegisterAccountContract.Output>;
}

export namespace RegisterAccountContract {
  export type Input = Omit<AccountModel, "id">;
  export type Output = AccountModel;
}
