import { Router } from "express";
import { LoanController } from "@/adapter/controllers/loanController";

export function loanRoutes(loanController: LoanController): Router {
  const router = Router();

  router.post("/", loanController.loanBook.bind(loanController));

  return router;
}
