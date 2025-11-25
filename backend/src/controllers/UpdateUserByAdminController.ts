// src/controllers/EditUserByAdminController.ts
import { Request, Response } from "express";
import { EditUserByAdminService } from "../services/UpdateUserByAdminService";

class UpadteUserByAdminController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const adminChanges = req.body;

      const userRole = (req as any).user?.role;

      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Acesso negado, somente admins podem eidtar usuários cadastrados no sistema!"
        });
      }

      const service = new EditUserByAdminService();
      const result = await service.execute(Number(id), adminChanges);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const updateUserByAdminController = new UpadteUserByAdminController();
