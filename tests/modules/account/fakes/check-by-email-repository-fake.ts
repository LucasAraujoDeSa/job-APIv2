import { CheckByEmailRepositoryContract } from "@/modules/account/domain/contracts/repositories";

export class CheckByEmailRepositoryFake
  implements CheckByEmailRepositoryContract
{
  email: string;

  public async ifAlreadyInUse(email: string): Promise<boolean> {
    this.email = email;
    return false;
  }
}
