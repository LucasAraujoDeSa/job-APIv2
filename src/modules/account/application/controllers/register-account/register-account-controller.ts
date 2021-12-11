import { RegisterAccountContract } from "@/modules/account/domain/contracts/use-cases";
import { AccountModel } from "@/modules/account/domain/models";
import { EmailValidatorAdapter } from "@/shared/adapters";
import { success, badRequest, handleError } from "@/shared/application/helpers";
import { Controller, Err, HttpResponse } from "@/shared/application/protocols";

export class RegisterAccountController implements Controller {
  constructor(
    private readonly _emailValidatorAdapter: EmailValidatorAdapter,
    private readonly _registerAccount: RegisterAccountContract
  ) {}

  public async handle(
    input: RegisterAccountController.Input
  ): Promise<HttpResponse> {
    try {
      const isValidEmail = await this._emailValidatorAdapter.isValid(
        input.email
      );

      if (!isValidEmail) {
        return badRequest("Invalid email format");
      }

      const { id, name, email } = await this._registerAccount.add(input);

      return success({ id, name, email });
    } catch (error) {
      return handleError(error as Err);
    }
  }
}

export namespace RegisterAccountController {
  export type Input = Omit<AccountModel, "id">;
}
