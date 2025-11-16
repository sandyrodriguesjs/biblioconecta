import { Request, Response } from "express";
import { UpdateBookService } from "../services/UpdateBookService";

export class UpdateBookController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file; 
    const dados = req.body;

    try {
      const service = new UpdateBookService();
      const livro = await service.execute(Number(id), dados, file);
      return res.status(200).json(livro);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

export const updateBookController = new UpdateBookController();
