import { Request, Response } from "express";
import { ListPendingReservationsService } from "../services/ListPendingReservationService";

export class ListPendingReservationsController {
  async handle(req: Request, res: Response) {
    try {
      const userRole = (req as any).user?.role;

      if (userRole !== "ADMIN") {
        return res.status(403).json({
          error: "Acesso negado, somente admins podem visualizar lista de reservas pendentes!"
        });
      }
      const service = new ListPendingReservationsService();
      const reservas = await service.execute();
      return res.status(200).json(reservas);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

export const listPendingReservationsController = new ListPendingReservationsController();
