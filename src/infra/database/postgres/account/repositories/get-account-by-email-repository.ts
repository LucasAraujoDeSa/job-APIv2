import { Repository, getRepository } from "typeorm";
import { GetAccountByEmailRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { PostgresAccoutnEntity } from "../entities/account-entity";

export class PostgresGetAccountByEmailRepository
  implements GetAccountByEmailRepositoryContract
{
  private ormconfig: Repository<PostgresAccoutnEntity>;

  constructor() {
    this.ormconfig = getRepository(PostgresAccoutnEntity);
  }

  public async get_account(
    email: string
  ): Promise<GetAccountByEmailRepositoryContract.Output> {
    const account = await this.ormconfig.findOne({
      where: { email },
    });

    return account;
  }
}
