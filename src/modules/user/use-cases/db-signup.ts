import {
  EmailValidatorAdapter,
  HashAdapter,
  SmtpAdapter,
} from "@/shared/adapters";
import { Signup } from "../domain/use-cases/signup";
import { CheckByEmailRepository, AddAccountRepository } from "../repositories";

export class DbSignup implements Signup {
  constructor(
    private readonly _emailValidatorAdapter: EmailValidatorAdapter,
    private readonly _checkByEmailRepository: CheckByEmailRepository,
    private readonly _hashAdapter: HashAdapter,
    private readonly _addAccountRepository: AddAccountRepository,
    private readonly _smtpAdapter: SmtpAdapter
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

    const newAccount = await this._addAccountRepository.add({
      ...params,
      password: hashedPassword,
    });

    await this._smtpAdapter.send({
      id: newAccount.id,
      email: newAccount.email,
    });

    return newAccount;
  }
}
