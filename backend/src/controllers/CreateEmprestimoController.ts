import { Request, Response } from "express";
import { CreateEmprestimoService } from "../services/CreateEmprestimoService";

export class CreateEmprestimoController {
  async handle(req: Request, res: Response) {
    try {

      const userRole = (req as any).user?.role;

      console.log("Request body:", req.body);
      console.log("User role:", req.user?.role);

      if (userRole !== "ADMIN") {
        res.status(403).json({
          error: "Acesso negado, somente admins podem aprovar um emprestimo!"
        });
        return;
      }

      let { userId, exemplarId } = req.body;

      if (!userId || !exemplarId) {
        return res.status(400).json({ error: "Campos userId e exemplarId são obrigatórios." });
      }

      userId = Number(userId);
      exemplarId = Number(exemplarId);

      if (isNaN(userId) || isNaN(exemplarId)) {
        return res.status(400).json({ error: "userId e exemplarId devem ser números válidos." });
      }

      const service = new CreateEmprestimoService();
      const result = await service.execute({ userId, exemplarId });

      return res.status(201).json(result);

    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export const createEmprestimoController = new CreateEmprestimoController();
