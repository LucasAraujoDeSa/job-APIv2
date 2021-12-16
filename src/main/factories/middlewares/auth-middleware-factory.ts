import { PostgresGetAccountByIdRepository } from "@/infra/database/postgres/account/repositories";
import { JsonWebTokenAdapter } from "@/infra/encrypter/encrypter-adapter";
import { AuthMiddleware } from "@/shared/middlewares/auth-middleware";

export const auth_middleware_factory = () => {
  const encrypterAdapter = new JsonWebTokenAdapter();
  const getAccountByIdRepository = new PostgresGetAccountByIdRepository();
  const authMiddleware = new AuthMiddleware(
    encrypterAdapter,
    getAccountByIdRepository
  );
  return authMiddleware;
};
