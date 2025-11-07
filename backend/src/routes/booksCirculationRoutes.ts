import { Router } from "express";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { createEmprestimoController } from "../controllers/CreateEmprestimoController";
import { registerDevolucaoController } from "../controllers/RegisterDevolucaoController";
import { renovarEmprestimoController } from "../controllers/RenovarEmprestimoController";

const router = Router();

router.post(
    "/emprestimos",
    isAuthenticated.handle.bind(isAuthenticated),
    createEmprestimoController.handle.bind(createEmprestimoController)
);

router.post(
    "/emprestimos/:id/devolucao",
    isAuthenticated.handle.bind(isAuthenticated),
    registerDevolucaoController.handle.bind(registerDevolucaoController)
);

router.post(
    "/emprestimos/:id/renovar",
    isAuthenticated.handle.bind(isAuthenticated),
    renovarEmprestimoController.handle.bind(renovarEmprestimoController)
);


export default router;
