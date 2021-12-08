import { AccountModel } from "../../models/account-model";

export interface LoginContract {
  login(input: LoginContract.Input): Promise<LoginContract.Output>;
}

export namespace LoginContract {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = AccountModel;
}
