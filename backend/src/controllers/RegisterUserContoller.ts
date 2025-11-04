import { Request, Response } from "express";
import { registerUserService } from "../services/RegisterUserService.js";

class RegisterUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const novoUsuario = await registerUserService(req.body);

      //Remove o campo de senha antes de enviar a resposta
      const { password, ...usuarioSemSenha } = novoUsuario;

      return res.status(201).json({
        mensagem: "Usuário criado com sucesso!",
        usuario: usuarioSemSenha,
      });
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error);
      return res.status(400).json({
        erro: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }
}

export const registerUserController = new RegisterUserController();
