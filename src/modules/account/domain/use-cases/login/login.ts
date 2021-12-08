import { LoginContract } from "../../contracts/use-cases";
import {
  GetAccountByEmailContract,
  UpdateAcessTokenContract,
} from "../../contracts/repositories";
import { ExceptionHandler } from "@/shared/application/errors/exception-handle";
import { HashAdapter, EncrypterAdapter } from "@/shared/adapters";

export class Login implements LoginContract {
  constructor(
    private readonly _getAccountByEmail: GetAccountByEmailContract,
    private readonly _hashAdapter: HashAdapter,
    private readonly _encrypterAdapter: EncrypterAdapter,
    private readonly _updateAcessToken: UpdateAcessTokenContract
  ) {}

  public async login(
    input: LoginContract.Input
  ): Promise<LoginContract.Output> {
    const account = await this._getAccountByEmail.get_account(input.email);

    if (!account) {
      throw new ExceptionHandler("email or password incorrect", 400);
    }

    const isCorrectPassword = await this._hashAdapter.compare(
      input.password,
      account.password
    );

    if (!isCorrectPassword) {
      throw new ExceptionHandler("email or password incorrect", 400);
    }

    const token = await this._encrypterAdapter.sign(account.id);

    const authenticated_account = await this._updateAcessToken.update(
      account.id,
      token
    );

    return authenticated_account;
  }
}
