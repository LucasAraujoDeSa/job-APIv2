import { EmailValidatorAdapter } from "../email-validator-adapter";

export class EmailValidatorFake implements EmailValidatorAdapter {
  email: string;

  public async isValid(email: string): Promise<boolean> {
    this.email = email;
    return true;
  }
}
