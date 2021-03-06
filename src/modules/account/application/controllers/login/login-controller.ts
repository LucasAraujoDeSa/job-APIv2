import { LoginContract } from "@/modules/account/domain/contracts/use-cases";
import { ok, handleError } from "@/shared/application/helpers";
import { Controller, Err, HttpResponse } from "@/shared/application/protocols";

export class LoginController implements Controller {
  constructor(private readonly _login: LoginContract) {}

  public async handle(input: LoginController.Input): Promise<HttpResponse> {
    try {
      const { id, name, access_token } = await this._login.login(input);

      return ok({ id, name, access_token });
    } catch (error) {
      return handleError(error as Err);
    }
  }
}

export namespace LoginController {
  export type Input = {
    email: string;
    password: string;
  };
}
