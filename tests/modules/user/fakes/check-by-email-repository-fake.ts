import { CheckByEmailRepository } from "@/modules/user/repositories";

export class CheckByEmailRepositoryFake implements CheckByEmailRepository {
  email: string;

  public async ifAlreadyInUse(email: string): Promise<boolean> {
    this.email = email;
    return false;
  }
}