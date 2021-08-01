export interface CheckByEmailRepository {
  ifAlreadyInUse(email: string): Promise<boolean>;
}
