import { Request, Response } from "express";
import { RenovarEmprestimoService } from "../services/RenovarEmprestimoService";

export class RenovarEmprestimoController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new RenovarEmprestimoService();
      const result = await service.execute(Number(id));
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export const renovarEmprestimoController = new RenovarEmprestimoController();
