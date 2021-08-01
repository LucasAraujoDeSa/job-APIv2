import { EmailValidatorAdapter } from "@/shared/adapters";

export class EmailValidatorAdapterFake implements EmailValidatorAdapter {
  email: string;

  public async isValid(email: string): Promise<boolean> {
    this.email = email;
    return true;
  }
}
