import { Request, Response } from "express";
import { RegisterDevolucaoService } from "../services/RegisterDevolucaoService";

export class RegisterDevolucaoController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new RegisterDevolucaoService();
      const result = await service.execute(Number(id));
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export const registerDevolucaoController = new RegisterDevolucaoController();
