import { Router } from "express";
import { isAuthenticated } from "../middlewares/IsAuthenticated";

import { getEmprestimosController } from "../controllers/GetEmprestimoController";

const router = Router();

router.get(
  "/emprestimos",
  isAuthenticated.handle.bind(isAuthenticated),
  getEmprestimosController.handle.bind(getEmprestimosController)
);

export default router;
