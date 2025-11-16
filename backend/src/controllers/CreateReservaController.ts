import { Request, Response } from "express";
import { CreateReservaService } from "../services/CreateReservaService";

export class CreateReservaController {
  async handle(req: Request, res: Response) {
    try {
      const id_usuario = Number((req as any).user_id);

      if (!id_usuario || isNaN(id_usuario)) {
        return res.status(401).json({ erro: "Usuário não autenticado." });
      }

      const { id_livro } = req.body;

      if (!id_livro) {
        return res
          .status(400)
          .json({ erro: "O campo id_livro é obrigatório." });
      }

      const service = new CreateReservaService();
      const reserva = await service.execute({
        id_usuario,
        id_livro,
      });

      return res.status(201).json(reserva);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

export const createReservaController = new CreateReservaController();
