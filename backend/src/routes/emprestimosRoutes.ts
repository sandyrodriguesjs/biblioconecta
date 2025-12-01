import { Router } from "express";
import { isAuthenticated } from "../middlewares/IsAuthenticated";

import { getEmprestimosController } from "../controllers/GetEmprestimoController";

const router = Router();

/**
 * @openapi
 * /emprestimos:
 *   get:
 *     tags:
 *       - Empréstimos
 *     summary: Listar todos os empréstimos
 *     description: 
 *       Retorna todos os empréstimos cadastrados no sistema, incluindo ativos, concluídos e atrasados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empréstimos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_emprestimo:
 *                     type: integer
 *                     example: 55
 *                   id_usuario:
 *                     type: integer
 *                     example: 1
 *                   id_exemplar:
 *                     type: integer
 *                     example: 5
 *                   data_retirada:
 *                     type: string
 *                     example: "2025-01-01T00:00:00.000Z"
 *                   data_prevista_devolucao:
 *                     type: string
 *                     example: "2025-01-15T00:00:00.000Z"
 *                   data_devolucao:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   renovado:
 *                     type: boolean
 *                     example: false
 *       401:
 *         description: Usuário não autenticado.
 */
router.get(
  "/emprestimos",
  isAuthenticated.handle.bind(isAuthenticated),
  getEmprestimosController.handle.bind(getEmprestimosController)
);

export default router;
