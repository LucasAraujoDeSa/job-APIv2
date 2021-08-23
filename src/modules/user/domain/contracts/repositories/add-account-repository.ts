import { UserModel } from "../../models";

export interface AddAccountRepository {
  add(
    params: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result>;
}

export namespace AddAccountRepository {
  export type Params = Omit<UserModel, "id">;
  export type Result = UserModel;
}
