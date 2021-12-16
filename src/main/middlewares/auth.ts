import { adaptMiddleware } from "../adapters";
import { auth_middleware_factory } from "../factories/middlewares/auth-middleware-factory";

export const auth = adaptMiddleware(auth_middleware_factory());
