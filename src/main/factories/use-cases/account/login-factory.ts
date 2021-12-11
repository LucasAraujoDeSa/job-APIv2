import { BcryptAdapter } from "@/infra/hash/bcrypt-adapter";
import { JsonWebTokenAdapter } from "@/infra/encrypter/encrypter-adapter";
import { Login } from "@/modules/account/domain/use-cases/login";
import {
  PostgresGetAccountByEmailRepository,
  PostgresUpdateAcessTokenRepository,
} from "@/infra/database/postgres/account/repositories";

export const login_factory = () => {
  const hashAdapter = new BcryptAdapter();
  const encrypterAdapter = new JsonWebTokenAdapter();
  const getAccountByEmailRepository = new PostgresGetAccountByEmailRepository();
  const updateAcessTokenRepository = new PostgresUpdateAcessTokenRepository();
  const login = new Login(
    getAccountByEmailRepository,
    hashAdapter,
    encrypterAdapter,
    updateAcessTokenRepository
  );

  return login;
};
