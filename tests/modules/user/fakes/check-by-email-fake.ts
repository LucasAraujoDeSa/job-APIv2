import { CheckByEmail } from "@/modules/user/repositories";

export class CheckByEmailFake implements CheckByEmail {
  email: string;

  public async ifAlreadyInUse(email: string): Promise<boolean> {
    this.email = email;
    return false;
  }
}
