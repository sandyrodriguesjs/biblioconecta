import { Router } from "express";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { createEmprestimoController } from "../controllers/CreateEmprestimoController";
import { registerDevolucaoController } from "../controllers/RegisterDevolucaoController";
import { renovarEmprestimoController } from "../controllers/RenovarEmprestimoController";
import { listPendingReservationsController } from "../controllers/ListPendingReservationController";
import { reservationDeleteController } from "../controllers/ReservationDeleteController";

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

router.get(
    "/reservations/pending",
    isAuthenticated.handle.bind(isAuthenticated),
    listPendingReservationsController.handle.bind(listPendingReservationsController)
);

router.delete(
  "/reservations/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  reservationDeleteController.handle.bind(reservationDeleteController)
);

export default router;
