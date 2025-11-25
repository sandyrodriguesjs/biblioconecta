import { Request, Response } from "express";
import { ReservationDeleteService } from "../services/ReservationDeleteService";

export class ReservationDeleteController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userRole = (req as any).user?.role;

      if (userRole !== "ADMIN") {
        res.status(403).json({
          error: "Acesso negado, somente admins podem deletar reservas pendentes!"
        });
        return;
      }

      if (!id) {
        return res.status(400).json({ error: "ID da reserva é obrigatório." });
      }

      const service = new ReservationDeleteService();
      const result = await service.execute(Number(id));

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
export const reservationDeleteController = new ReservationDeleteController();
