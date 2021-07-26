import { Signup } from "../domain/use-cases/signup";

export class DbSignup implements Signup {
  public async add(params: Signup.Params): Promise<Signup.Result> {
    return {
      id: "any",
      ...params,
    };
  }
}
