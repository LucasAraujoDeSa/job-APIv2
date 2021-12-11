import { AccountModel } from "../../models";

export interface UpdateAcessTokenRepositoryContract {
  update(id: string, token: string): Promise<AccountModel>;
}

export namespace UpdateAcessTokenRepositoryContract {
  export type Output = AccountModel;
}
