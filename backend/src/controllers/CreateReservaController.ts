import { Request, Response } from "express";
import { CreateReservaService } from "../services/CreateReservaService";

export class CreateReservaController {
  async handle(req: Request, res: Response) {
    try {
      // ID do usuário autenticado vem do middleware `IsAuthenticated`
      const id_usuario = (req as any).userId;
      const { id_livro } = req.body;

      if (!id_livro) {
        return res.status(400).json({ erro: "O campo id_livro é obrigatório." });
      }

      const createReservaService = new CreateReservaService();
      const reserva = await createReservaService.execute({ id_usuario, id_livro });

      return res.status(201).json(reserva);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}
export const createReservaController = new CreateReservaController();