import { CheckByEmailRepository } from "@/modules/user/domain/contracts/repositories";

export class CheckByEmailRepositoryFake implements CheckByEmailRepository {
  email: string;

  public async ifAlreadyInUse(email: string): Promise<boolean> {
    this.email = email;
    return false;
  }
}
