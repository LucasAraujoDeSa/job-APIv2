import { AccountModel } from "../../models";

export interface GetAccountByIdRepositoryContract {
  get_account(id: string): Promise<GetAccountByIdRepositoryContract.Output>;
}

export namespace GetAccountByIdRepositoryContract {
  export type Output = AccountModel | undefined;
}
