import {
  EmailValidatorAdapter,
  HashAdapter,
  SmtpAdapter,
} from "@/shared/adapters";
import { RegisterAccountContract } from "../../domain/contracts/use-cases/register-account-contract";
import {
  CheckByEmailRepositoryContract,
  AddAccountRepositoryContract,
} from "../../domain/contracts/repositories";

export class RegisterAccount implements RegisterAccountContract {
  constructor(
    private readonly _emailValidatorAdapter: EmailValidatorAdapter,
    private readonly _checkByEmailRepository: CheckByEmailRepositoryContract,
    private readonly _hashAdapter: HashAdapter,
    private readonly _addAccountRepository: AddAccountRepositoryContract,
    private readonly _smtpAdapter: SmtpAdapter
  ) {}

  public async add(
    params: RegisterAccountContract.Params
  ): Promise<RegisterAccountContract.Result> {
    const isValidEmail = await this._emailValidatorAdapter.isValid(
      params.email
    );

    if (!isValidEmail) {
      throw new Error("Invalid email format");
    }

    const alreadyEmailInUse = await this._checkByEmailRepository.ifAlreadyInUse(
      params.email
    );

    if (alreadyEmailInUse) {
      throw new Error("Email already in use");
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
