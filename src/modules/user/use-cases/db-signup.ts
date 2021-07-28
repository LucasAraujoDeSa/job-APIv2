import { EmailValidatorAdapter } from "@/shared/adapters/email-validator-adapter/email-validator-adapter";
import { Signup } from "../domain/use-cases/signup";

export class DbSignup implements Signup {
  constructor(private readonly _emailValidator: EmailValidatorAdapter) {}

  public async add(params: Signup.Params): Promise<Signup.Result> {
    const isValidEmail = await this._emailValidator.isValid(params.email);

    if (!isValidEmail) {
      throw new Error("invalid email format");
    }

    return {
      id: "any",
      ...params,
    };
  }
}
