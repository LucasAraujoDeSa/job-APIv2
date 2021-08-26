import { AccountModel } from "@/modules/account/domain/models";
import { EmailValidatorAdapter } from "@/shared/adapters";

interface HttpResponse {
  status_code: number;
  body?: any;
}

interface Controller<T = any> {
  handle(request: T): Promise<HttpResponse>;
}

export class RegisterAccountController implements Controller {
  constructor(private readonly _emailValidatorAdapter: EmailValidatorAdapter) {}

  public async handle(
    input: RegisterAccountController.Input
  ): Promise<HttpResponse> {
    const isValidEmail = await this._emailValidatorAdapter.isValid(input.email);

    if (!isValidEmail) {
      return {
        status_code: 400,
        body: "Invalid email format",
      };
    }

    return {
      status_code: 201,
      body: "",
    };
  }
}

export namespace RegisterAccountController {
  export type Input = Omit<AccountModel, "id">;
}
