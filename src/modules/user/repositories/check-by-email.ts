export interface CheckByEmail {
  ifAlreadyInUse(email: string): Promise<boolean>;
}
