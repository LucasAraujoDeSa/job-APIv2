import { Router } from "express";
import { register_account_controller_factory } from "@/main/factories/controllers/account/register-account-controller-factory";
import { adaptRoute } from "../adapters";

export default (router: Router): void => {
  router.post("/singup", adaptRoute(register_account_controller_factory()));
};
