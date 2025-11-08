import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<void> {
    const userId = req.user_id;
    const { name, email, password } = req.body;

    const fotoFile = req.file;

    const service = new UpdateUserService();

    try {
      const updatedUser = await service.execute(Number(userId), {
        name,
        email,
        password,
        fotoFilePath: fotoFile?.path,
      });

      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const updateUserController = new UpdateUserController();
