import { Router } from "express";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { registerUserController } from "../controllers/RegisterUserContoller";
import { updateUserController } from "../controllers/UpdateUserController";
import { deleteUserController } from "../controllers/DeleteUserController";
import { getUserDetailsController } from "../controllers/GetUserDetailsController";
import { getAllUsersController } from "../controllers/GetAllUsersController";
import { authUserController } from "../controllers/AuthUserController";
import { createReservaController } from "../controllers/CreateReservaController";
import { updateUserByAdminController } from "../controllers/UpdateUserByAdminController";
import { blockUserController } from "../controllers/BlockUserController";
import { getReadingHistoryCurrentMonthController } from "../controllers/GetReadingHistoryCurrentMonthController";
import { upload } from "../middlewares/multer";

const router = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Login de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post("/login", authUserController.handle.bind(authUserController));

/**
 * @openapi
 * /register:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Registrar novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post("/register", registerUserController.handle.bind(registerUserController));

/**
 * @openapi
 * /me:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Obter dados do usuário logado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário autenticado
 */
router.get(
  "/me",
  isAuthenticated.handle.bind(isAuthenticated),
  getUserDetailsController.handle.bind(getUserDetailsController)
);

/**
 * @openapi
 * /me:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualizar dados do usuário logado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dados atualizados com sucesso
 */
router.put(
  "/me",
  isAuthenticated.handle.bind(isAuthenticated),
  upload.single("foto"),
  updateUserController.handle.bind(updateUserController)
);

/**
 * @openapi
 * /usuarios:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Listar todos os usuários (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get(
  "/usuarios",
  isAuthenticated.handle.bind(isAuthenticated),
  getAllUsersController.handle.bind(getAllUsersController)
);

/**
 * @openapi
 * /usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Deletar usuário (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado
 */
router.delete(
  "/usuarios/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  deleteUserController.handle.bind(deleteUserController)
);

/**
 * @openapi
 * /reservas:
 *   post:
 *     tags:
 *       - Reservas
 *     summary: Criar uma reserva de livro
 *     description: O usuário deve estar autenticado. O id_usuario é obtido a partir do token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_livro]
 *             properties:
 *               id_livro:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 */
router.post(
  "/reservas",
  isAuthenticated.handle.bind(isAuthenticated),
  createReservaController.handle.bind(createReservaController)
);

/**
 * @openapi
 * /reading-history/current-month:
 *   get:
 *     tags:
 *       - Histórico
 *     summary: Histórico de leituras do mês atual
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de leituras do usuário
 */
router.get(
  "/reading-history/current-month",
  isAuthenticated.handle.bind(isAuthenticated),
  getReadingHistoryCurrentMonthController.handle.bind(getReadingHistoryCurrentMonthController)
);

/**
 * @openapi
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários (Admin)
 *     summary: Atualizar qualquer usuário (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.put(
  "/usuarios/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  updateUserByAdminController.handle.bind(updateUserByAdminController)
);

/**
 * @openapi
 * /usuarios/{id}/block:
 *   put:
 *     tags:
 *       - Usuários (Admin)
 *     summary: Bloquear usuário por atraso (ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário bloqueado
 */
router.put(
  "/usuarios/:id/block",
  isAuthenticated.handle.bind(isAuthenticated),
  blockUserController.handle.bind(blockUserController)
);

export default router;
