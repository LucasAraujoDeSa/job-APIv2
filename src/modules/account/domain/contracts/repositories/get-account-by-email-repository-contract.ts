import { AccountModel } from "../../models";

export interface GetAccountByEmailRepositoryContract {
  get_account(
    email: string
  ): Promise<GetAccountByEmailRepositoryContract.Output>;
}

export namespace GetAccountByEmailRepositoryContract {
  export type Output = AccountModel | undefined;
}
