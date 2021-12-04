import { Repository, getRepository } from "typeorm";
import { CheckByEmailRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { PostgresAccoutnEntity } from "../entities/account-entity";

export class PostgresCheckByEmailRepository
  implements CheckByEmailRepositoryContract
{
  private ormconfig: Repository<PostgresAccoutnEntity>;

  constructor() {
    this.ormconfig = getRepository(PostgresAccoutnEntity);
  }

  public async ifAlreadyInUse(email: string): Promise<boolean> {
    const account = await this.ormconfig.findOne({
      where: { email },
    });

    return !!account;
  }
}
