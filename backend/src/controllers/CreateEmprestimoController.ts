import { Request, Response } from "express";
import { CreateEmprestimoService } from "../services/CreateEmprestimoService";

export class CreateEmprestimoController {
  async handle(req: Request, res: Response) {
    try {
      const { userId, exemplarId } = req.body;
      const service = new CreateEmprestimoService();
      const result = await service.execute({ userId, exemplarId });
      return res.status(201).json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export const createEmprestimoController = new CreateEmprestimoController();
