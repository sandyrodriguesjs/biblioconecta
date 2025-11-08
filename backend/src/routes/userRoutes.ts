import { Router } from 'express';
import { isAuthenticated } from '../middlewares/IsAuthenticated';
import { registerUserController } from "../controllers/RegisterUserContoller";
import { updateUserController } from "../controllers/UpdateUserController";
import { deleteUserController } from "../controllers/DeleteUserController";
import { getUserDetailsController } from "../controllers/GetUserDetailsController";
import { getAllUsersController } from "../controllers/GetAllUsersController";
import { authUserController } from "../controllers/AuthUserController";
import { createReservaController } from "../controllers/CreateReservaController";
import { upload } from "../middlewares/multer";


const router = Router();

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
  upload.single("foto"),
  updateUserController.handle.bind(updateUserController)
);

//Listar todos os uusuários (apenas ADMIN)
router.get(
  "/usuarios",
  isAuthenticated.handle.bind(isAuthenticated),
  getAllUsersController.handle.bind(getAllUsersController)
);

//Deletar usuário (apenas ADMIN)
router.delete(
  "/usuarios/:id",
  isAuthenticated.handle.bind(isAuthenticated),
  deleteUserController.handle.bind(deleteUserController)
);

//Reservar um livro
router.post(
  "/reservas",
  isAuthenticated.handle.bind(isAuthenticated),
  createReservaController.handle.bind(createReservaController)
);

export default router;
