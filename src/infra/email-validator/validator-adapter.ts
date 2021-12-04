import validator from "validator";
import { EmailValidatorAdapter } from "@/shared/adapters";

export class ValidatorAdapter implements EmailValidatorAdapter {
  public async isValid(email: string): Promise<boolean> {
    const isEmail = validator.isEmail(email);

    return isEmail;
  }
}
