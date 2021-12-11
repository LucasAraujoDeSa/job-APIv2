import { Repository, getRepository } from "typeorm";
import { UpdateAcessTokenRepositoryContract } from "@/modules/account/domain/contracts/repositories";
import { PostgresAccoutnEntity } from "../entities/account-entity";

export class PostgresUpdateAcessTokenRepository
  implements UpdateAcessTokenRepositoryContract
{
  private ormconfig: Repository<PostgresAccoutnEntity>;

  constructor() {
    this.ormconfig = getRepository(PostgresAccoutnEntity);
  }

  public async update(
    id: string,
    token: string
  ): Promise<UpdateAcessTokenRepositoryContract.Output> {
    const account = await this.ormconfig.findOne(id);
    const updatedAccount = await this.ormconfig.save({
      ...account,
      access_token: token,
    });

    return updatedAccount;
  }
}
