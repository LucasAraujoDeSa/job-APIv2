import { EmailValidatorAdapter } from "@/shared/adapters";
import validator from "validator";

export class ValidatorAdapter implements EmailValidatorAdapter {
  public async isValid(email: string): Promise<boolean> {
    const isEmail = validator.isEmail(email);

    return isEmail;
  }
}
