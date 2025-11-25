import { Request, Response } from "express";
import { DeleteBookService } from "../services/DeleteBookService";

export class DeleteBookController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const userRole = (req as any).user?.role;

    if (userRole !== "ADMIN") {
      return res.status(403).json({
        error: "Acesso negado, somente admins podem deletar livros!"
      });
    }

    try {
      const service = new DeleteBookService();
      const result = await service.execute(Number(id));

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

export const deleteBookController = new DeleteBookController();
