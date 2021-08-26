import { HashAdapter, SmtpAdapter } from "@/shared/adapters";
import { RegisterAccountContract } from "../../contracts/use-cases/register-account-contract";
import {
  CheckByEmailRepositoryContract,
  AddAccountRepositoryContract,
} from "../../contracts/repositories";

export class RegisterAccount implements RegisterAccountContract {
  constructor(
    private readonly _checkByEmailRepository: CheckByEmailRepositoryContract,
    private readonly _hashAdapter: HashAdapter,
    private readonly _addAccountRepository: AddAccountRepositoryContract,
    private readonly _smtpAdapter: SmtpAdapter
  ) {}

  public async add(
    params: RegisterAccountContract.Params
  ): Promise<RegisterAccountContract.Result> {
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
