import { Request, Response } from "express";
import { CreateEmprestimoService } from "../services/CreateEmprestimoService";

export class CreateEmprestimoController {
  async handle(req: Request, res: Response) {
    try {
      // Verifica se o admin está logado
      // const userRole = (req as any).role;

      // if (userRole !== "ADMIN") {
      //   return res.status(403).json({ error: "Apenas administradores podem registrar empréstimos." });
      // }

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
