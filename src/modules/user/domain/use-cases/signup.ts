import { UserModel } from "../models/user-model";

export interface Signup {
  add(params: Signup.Params): Promise<Signup.Result>;
}

export namespace Signup {
  export type Params = Omit<UserModel, "id">;
  export type Result = UserModel;
}
