export interface EmailValidatorAdapter {
  isValid(email: string): Promise<boolean>;
}
