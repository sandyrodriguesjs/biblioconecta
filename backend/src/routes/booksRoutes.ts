import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { createBookController } from "../controllers/CreateBookController";
import { updateBookController } from "../controllers/UpdateBookController";
import { deleteBookController } from "../controllers/DeleteBookController";
import { getBooksController } from "../controllers/GetBooksController";
import { isAuthenticated } from '../middlewares/IsAuthenticated';
import { upload } from "../middlewares/multer";

const router = Router();
const prisma = new PrismaClient();

/**
 * @openapi
 * /livros:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Listar todos os livros
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros cadastrados
 *       401:
 *         description: Usuário não autenticado
 */
router.get(
  "/livros",
  isAuthenticated.handle.bind(isAuthenticated),
  (req, res) => getBooksController.listAll(req, res)
);

/**
 * @openapi
 * /livros/{id}:
 *   get:
 *     tags:
 *       - Livros
 *     summary: Buscar livro por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 *       401:
 *         description: Usuário não autenticado
 */
router.get(
  "/livros/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  (req, res) => getBooksController.listById(req, res)
);

/**
 * @openapi
 * /livros:
 *   post:
 *     tags:
 *       - Livros
 *     summary: Criar um novo livro
 *     description: 
 *       Cria um livro novo conforme as validações definidas no schema de criação.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - isbn
 *               - titulo
 *               - autor
 *               - categoria
 *               - editora
 *               - ano_publicacao
 *               - sinopse
 *             properties:
 *               capa:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo da capa do livro
 *               isbn:
 *                 type: string
 *                 example: "9788532530783"
 *               titulo:
 *                 type: string
 *                 example: "A Biblioteca da Meia-Noite"
 *               autor:
 *                 type: string
 *                 example: "Matt Haig"
 *               categoria:
 *                 type: string
 *                 example: "Ficção"
 *               editora:
 *                 type: string
 *                 example: "Bertrand Brasil"
 *               ano_publicacao:
 *                 type: integer
 *                 example: 2020
 *               sinopse:
 *                 type: string
 *                 example: "Uma mulher descobre uma biblioteca entre a vida e a morte..."
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Erro de validação (Zod)
 *       401:
 *         description: Usuário não autenticado
 *       403:
 *         description: Apenas administradores podem criar livros
 */
router.post(
  "/livros",
  upload.single("capa"),
  isAuthenticated.handle.bind(isAuthenticated),
  (req, res) => createBookController.handle(req, res)
);

/**
 * @openapi
 * /livros/{id}:
 *   put:
 *     tags:
 *       - Livros
 *     summary: Atualizar dados de um livro
 *     description: 
 *       Atualiza os campos permitidos conforme o schema de atualização.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               capa:
 *                 type: string
 *                 format: binary
 *               isbn:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 20
 *               titulo:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 255
 *               autor:
 *                 type: string
 *                 minLength: 2
 *               categoria:
 *                 type: string
 *                 minLength: 2
 *               editora:
 *                 type: string
 *                 minLength: 2
 *               sinopse:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Livro não encontrado
 *       401:
 *         description: Usuário não autenticado
 */
router.put(
  "/livros/:id",
  upload.single("capa"),
  isAuthenticated.handle.bind(isAuthenticated),
  (req, res) => updateBookController.handle(req, res)
);

/**
 * @openapi
 * /livros/{id}:
 *   delete:
 *     tags:
 *       - Livros
 *     summary: Deletar um livro
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         required: true
 *         in: path
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro deletado
 *       404:
 *         description: Livro não encontrado
 *       401:
 *         description: Usuário não autenticado
 */
router.delete(
  "/livros/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  (req, res) => deleteBookController.handle(req, res)
);

export default router;
