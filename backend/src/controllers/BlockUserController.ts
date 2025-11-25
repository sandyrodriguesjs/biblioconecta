// src/controllers/BlockUserIfLateController.ts
import { Request, Response } from "express";
import { BlockUserIfLateService } from "../services/BlockUserService";

class BlockUserController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userRole = (req as any).user?.role;

      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Acesso negado, somente admins podem bloquear usuários!"
        });
      }

      const service = new BlockUserIfLateService();
      const result = await service.execute(Number(id));

      return res.status(200).json({
        message: "Usuário bloqueado devido a atraso em devolução.",
        user: result,
      });

    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const blockUserController = new BlockUserController();
