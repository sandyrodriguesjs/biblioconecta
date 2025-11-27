import { Request, Response } from "express";
import { GetBooksService } from "../services/GetBooksService";

export class GetBooksController {
  private listLivrosService: GetBooksService;

  constructor() {
    this.listLivrosService = new GetBooksService();
  }

  async listAll(req: Request, res: Response): Promise<void> {
    try {
      const livros = await this.listLivrosService.listAllBooks();
      res.status(200).json(livros);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async listById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const livro = await this.listLivrosService.listBooksById(Number(id));
      res.status(200).json(livro);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
}

export const getBooksController = new GetBooksController();
