// src/controllers/usuarios/GetAllUsersController.ts
import { Request, Response } from "express";
import { GetAllUsersService } from "../services/GetAllUsersService";

export class GetAllUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const userRole = (req as any).user?.role;

      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Acesso negado, somente admins podem visualizar todos os usuários!"
        });
      }

      const service = new GetAllUsersService();
      const usuarios = await service.execute();

      return res.status(200).json(usuarios);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const getAllUsersController = new GetAllUsersController();
