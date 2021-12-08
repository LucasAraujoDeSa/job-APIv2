import { AccountModel } from "../../models";

export interface UpdateAcessTokenContract {
  update(id: string, token: string): Promise<AccountModel>;
}
