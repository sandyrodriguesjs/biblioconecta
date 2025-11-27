// src/controllers/GetReadingHistoryCurrentMonthController.ts
import { Request, Response } from "express";
import { GetReadingHistoryCurrentMonthService } from "../services/GetReadingHistoryCurrentMonthService";

class GetReadingHistoryCurrentMonthController {
  async handle(req: Request, res: Response) {
    try {
      const { user_id } = req;

      if (!user_id) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const service = new GetReadingHistoryCurrentMonthService();
      const history = await service.execute(Number(user_id));

      return res.status(200).json(history);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const getReadingHistoryCurrentMonthController =
  new GetReadingHistoryCurrentMonthController();
