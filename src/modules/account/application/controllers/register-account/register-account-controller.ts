import { RegisterAccountContract } from "@/modules/account/domain/contracts/use-cases";
import { AccountModel } from "@/modules/account/domain/models";
import { EmailValidatorAdapter } from "@/shared/adapters";
import { success, badRequest } from "@/shared/application/helpers";
import { Controller, HttpResponse } from "@/shared/application/protocols";
import { requiredFieldsValidation } from "@/shared/validations";

export class RegisterAccountController implements Controller {
  constructor(
    private readonly _emailValidatorAdapter: EmailValidatorAdapter,
    private readonly _registerAccount: RegisterAccountContract
  ) {}

  public async handle(
    input: RegisterAccountController.Input
  ): Promise<HttpResponse> {
    const requiredFields = requiredFieldsValidation(input);

    if (requiredFields.hasMissing) {
      return badRequest(
        `Required field ${requiredFields.missing_field} is missing`
      );
    }

    const isValidEmail = await this._emailValidatorAdapter.isValid(input.email);

    if (!isValidEmail) {
      return badRequest("Invalid email format");
    }

    const account = await this._registerAccount.add(input);

    return success(account);
  }
}

export namespace RegisterAccountController {
  export type Input = Omit<AccountModel, "id">;
}
