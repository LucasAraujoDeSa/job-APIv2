import { GetAccountByIdRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { EncrypterAdapter } from "../adapters";
import { handleError, ok, unauthorized } from "../application/helpers";
import { Err, HttpResponse, Middleware } from "../application/protocols";

interface Authorization {
  access_token: string;
}

export class AuthMiddleware implements Middleware {
  constructor(
    private _encrypterAdapter: EncrypterAdapter,
    private _getAccountByIdRepository: GetAccountByIdRepositoryContract
  ) {}

  public async handle(req: Authorization): Promise<HttpResponse> {
    try {
      const { access_token } = req;

      if (!access_token) {
        return unauthorized("no token provider");
      }

      const payload = this._encrypterAdapter.verify(access_token);

      if (!payload) {
        return unauthorized("not authenticated");
      }

      const account = await this._getAccountByIdRepository.get_account(payload);

      if (!account) {
        return unauthorized("sorry, but this account not exist");
      }

      return ok(payload);
    } catch (error) {
      return handleError(error as Err);
    }
  }
}
