import { Request, Response } from "express";
import { ListPendingReservationsService } from "../services/ListPendingReservationService";

export class ListPendingReservationsController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListPendingReservationsService();
      const reservas = await service.execute();
      return res.status(200).json(reservas);
    } catch (error: any) {
      return res.status(500).json({ erro: error.message });
    }
  }
}

export const listPendingReservationsController = new ListPendingReservationsController();
