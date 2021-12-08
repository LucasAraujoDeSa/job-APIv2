import { AccountModel } from "../../models";

export interface GetAccountByEmailContract {
  get_account(email: string): Promise<AccountModel | undefined>;
}
