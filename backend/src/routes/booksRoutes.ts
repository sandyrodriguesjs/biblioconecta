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

// ============GESTÃO DE ACERVOS===============

//Listar todos os livros
router.get("/livros",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => getBooksController.listAll(req, res));

//Listar livro por ID
router.get("livros/:id",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => getBooksController.listById(req, res));

//Cadastrar novo livro
router.post(
    "/livros",
    upload.single("capa"),
    (req, res) => createBookController.handle(req, res)
);

// Atualizar livro
router.put("/livros/:id",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => updateBookController.handle(req, res));

// Deletar livro
router.delete("/livros/:id",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => deleteBookController.handle(req, res));

export default router;
