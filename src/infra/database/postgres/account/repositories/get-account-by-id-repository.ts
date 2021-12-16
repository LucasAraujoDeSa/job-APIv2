import { Repository, getRepository } from "typeorm";
import { GetAccountByIdRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { PostgresAccoutnEntity } from "../entities/account-entity";

export class PostgresGetAccountByIdRepository
  implements GetAccountByIdRepositoryContract
{
  private ormconfig: Repository<PostgresAccoutnEntity>;

  constructor() {
    this.ormconfig = getRepository(PostgresAccoutnEntity);
  }

  public async get_account(
    id: string
  ): Promise<GetAccountByIdRepositoryContract.Output> {
    const account = await this.ormconfig.findOne(id);

    return account;
  }
}
