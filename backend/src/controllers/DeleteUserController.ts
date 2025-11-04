// src/controllers/usuarios/DeleteUserController.ts
import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const userRole = (req as any).user?.role;

      //Verifica permissão
      if (userRole !== "ADMIN") {
        return res.status(403).json({ error: "Acesso negado, somente admins podem deletar usuários!" });
      }

      const service = new DeleteUserService();
      await service.execute(Number(id));

      return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const deleteUserController = new DeleteUserController();
