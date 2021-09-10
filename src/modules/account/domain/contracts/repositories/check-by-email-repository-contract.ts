export interface CheckByEmailRepositoryContract {
  ifAlreadyInUse(email: string): Promise<boolean>;
}
