import { Request, Response } from "express";
import { GetEmprestimosService } from "../services/GetEmprestimoService";

export class GetEmprestimosController {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetEmprestimosService();
      const dados = await service.execute();
      res.json(dados);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const getEmprestimosController = new GetEmprestimosController();
