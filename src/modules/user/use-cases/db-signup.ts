import { EmailValidatorAdapter, HashAdapter } from "@/shared/adapters";
import { Signup } from "../domain/use-cases/signup";
import { CheckByEmailRepository } from "../repositories";

export class DbSignup implements Signup {
  constructor(
    private readonly _emailValidatorAdapter: EmailValidatorAdapter,
    private readonly _checkByEmailRepository: CheckByEmailRepository,
    private readonly _hashAdapter: HashAdapter
  ) {}

  public async add(params: Signup.Params): Promise<Signup.Result> {
    const isValidEmail = await this._emailValidatorAdapter.isValid(
      params.email
    );

    if (!isValidEmail) {
      throw new Error("invalid email format");
    }

    const alreadyEmailInUse = await this._checkByEmailRepository.ifAlreadyInUse(
      params.email
    );

    if (alreadyEmailInUse) {
      throw new Error("email already in use");
    }

    const hashedPassword = await this._hashAdapter.hash(params.password);

    return {
      id: "any",
      ...params,
      password: hashedPassword,
    };
  }
}
