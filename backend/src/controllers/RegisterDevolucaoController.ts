import { Request, Response } from "express";
import { RegisterDevolucaoService } from "../services/RegisterDevolucaoService";

export class RegisterDevolucaoController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userRole = (req as any).user?.role;

      if (userRole !== "ADMIN") {
        res.status(403).json({
          error: "Acesso negado, somente admins podem registrar devolução de um livro!"
        });
        return;
      }
      const service = new RegisterDevolucaoService();
      const result = await service.execute(Number(id));
      return res.json(result);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export const registerDevolucaoController = new RegisterDevolucaoController();
