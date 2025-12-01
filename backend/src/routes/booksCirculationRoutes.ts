import { Router } from "express";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { createEmprestimoController } from "../controllers/CreateEmprestimoController";
import { registerDevolucaoController } from "../controllers/RegisterDevolucaoController";
import { listPendingReservationsController } from "../controllers/ListPendingReservationController";
import { reservationDeleteController } from "../controllers/ReservationDeleteController";

const router = Router();

/**
 * @openapi
 * /emprestimos:
 *   post:
 *     tags:
 *       - Empréstimos
 *     summary: Aprovar um empréstimo de exemplar (ADMIN)
 *     description: 
 *       Cria um empréstimo para um usuário reservante. Somente ADMIN pode aprovar o empréstimo.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - exemplarId
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               exemplarId:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Empréstimo aprovado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_emprestimo:
 *                   type: integer
 *                   example: 55
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *                 id_exemplar:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Erro de validação ou regra de negócio.
 *       403:
 *         description: Acesso negado. Apenas ADMIN pode aprovar empréstimos.
 */
router.post(
  "/emprestimos",
  isAuthenticated.handle.bind(isAuthenticated),
  createEmprestimoController.handle.bind(createEmprestimoController)
);

/**
 * @openapi
 * /emprestimos/{id}/devolucao:
 *   post:
 *     tags:
 *       - Empréstimos
 *     summary: Registrar devolução de um empréstimo
 *     description: 
 *       Atualiza o empréstimo para concluído e libera o exemplar emprestado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do empréstimo
 *         schema:
 *           type: integer
 *           example: 55
 *     responses:
 *       200:
 *         description: Devolução registrada com sucesso.
 *       400:
 *         description: Erro de regra de negócio ou empréstimo inexistente.
 *       401:
 *         description: Usuário não autenticado.
 */
router.post(
  "/emprestimos/:id/devolucao",
  isAuthenticated.handle.bind(isAuthenticated),
  registerDevolucaoController.handle.bind(registerDevolucaoController)
);

/**
 * @openapi
 * /reservations/pending:
 *   get:
 *     tags:
 *       - Reservas
 *     summary: Listar reservas pendentes
 *     description:
 *       Retorna todas as reservas pendentes aguardando aprovação. Apenas ADMIN.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas pendentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_reserva:
 *                     type: integer
 *                     example: 10
 *                   id_usuario:
 *                     type: integer
 *                     example: 1
 *                   id_livro:
 *                     type: integer
 *                     example: 5
 *                   status:
 *                     type: string
 *                     example: "PENDENTE"
 *       403:
 *         description: Apenas ADMIN pode visualizar reservas pendentes.
 *       401:
 *         description: Usuário não autenticado.
 */
router.get(
  "/reservations/pending",
  isAuthenticated.handle.bind(isAuthenticated),
  listPendingReservationsController.handle.bind(listPendingReservationsController)
);

/**
 * @openapi
 * /reservations/{id}:
 *   delete:
 *     tags:
 *       - Reservas
 *     summary: Cancelar uma reserva
 *     description:
 *       Cancela uma reserva ativa e libera o exemplar que estava reservado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da reserva
 *         schema:
 *           type: integer
 *           example: 20
 *     responses:
 *       200:
 *         description: Reserva cancelada com sucesso.
 *       400:
 *         description: Reserva inexistente ou regra de negócio violada.
 *       401:
 *         description: Usuário não autenticado.
 */
router.delete(
  "/reservations/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  reservationDeleteController.handle.bind(reservationDeleteController)
);

export default router;
