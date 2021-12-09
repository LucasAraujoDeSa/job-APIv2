import { AccountModel } from "../../models";

export interface UpdateAcessTokenRepositoryContract {
  update(id: string, token: string): Promise<AccountModel>;
}
