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

router.get("/livros",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => getBooksController.listAll(req, res));

router.get("/livros/:id",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => getBooksController.listById(req, res));

router.post(
    "/livros",
    upload.single("capa"),
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => createBookController.handle(req, res)
);

router.put(
    "/livros/:id",
    upload.single("capa"),
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => updateBookController.handle(req, res));

router.delete("/livros/:id",
    isAuthenticated.handle.bind(isAuthenticated),
    (req, res) => deleteBookController.handle(req, res));

export default router;
