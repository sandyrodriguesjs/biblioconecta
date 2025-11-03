import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from '../middlewares/IsAuthenticated';
import { registerUserController } from "../controllers/RegisterUserContoller";
import { updateUserController } from "../controllers/UpdateUserController";
import { getUserDetailsController } from "../controllers/GetUserDetailsController";
import { authUserController } from "../controllers/AuthUserController";
import { createReservaController } from "../controllers/CreateReservaController";


const router = Router();
const prisma = new PrismaClient();

router.post('/login', authUserController.handle.bind(authUserController));

router.post('/register', registerUserController.handle.bind(registerUserController));

router.get(
  "/me",
  isAuthenticated.handle.bind(isAuthenticated),
  getUserDetailsController.handle.bind(getUserDetailsController)
);

// Atualizar dados do usuário logado
router.put(
  "/me",
  isAuthenticated.handle.bind(isAuthenticated),
  updateUserController.handle.bind(updateUserController)
);

// Rota de exemplo: listar todos os usuários
router.get('/', async (req, res) => {
  const usuarios = await prisma.usuarios.findMany();
  res.json(usuarios);
});

router.post(
  "/reservas",
  isAuthenticated.handle.bind(isAuthenticated),
  createReservaController.handle.bind(createReservaController)
);

export default router;
