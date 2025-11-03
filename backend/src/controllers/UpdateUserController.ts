import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        try {
            // O ID do usuário autenticado vem do middleware isAuthenticated
            const { user_id } = req;

            if (!user_id) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }
            const { name, email, password } = req.body;

            const service = new UpdateUserService();
            const user = await service.execute(Number(user_id), { name, email, password });

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(400).json({ erro: error.message });
        }
    }
}
export const updateUserController = new UpdateUserController();