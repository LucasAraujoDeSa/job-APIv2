import { RegisterAccountContract } from "@/modules/account/domain/contracts/use-cases";
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
  constructor(
    private readonly _emailValidatorAdapter: EmailValidatorAdapter,
    private readonly _registerAccount: RegisterAccountContract
  ) {}

  public async handle(
    input: RegisterAccountController.Input
  ): Promise<HttpResponse> {
    const required_fields = Object.entries(input);

    for (const [key, value] of required_fields) {
      if (
        (key && typeof value === undefined) ||
        typeof value === null ||
        value === ""
      ) {
        return {
          status_code: 400,
          body: `Missing param ${key}`,
        };
      }
    }

    const isValidEmail = await this._emailValidatorAdapter.isValid(input.email);

    if (!isValidEmail) {
      return {
        status_code: 400,
        body: "Invalid email format",
      };
    }

    const account = await this._registerAccount.add(input);

    return {
      status_code: 201,
      body: account,
    };
  }
}

export namespace RegisterAccountController {
  export type Input = Omit<AccountModel, "id">;
}
