import { LoginController } from "@/modules/account/application/controllers/login/login-controller";
import { login_factory } from "../../use-cases/account";

export const login_controller_factory = () => {
  const loginAccount = login_factory();
  const loginController = new LoginController(loginAccount);

  return loginController;
};
