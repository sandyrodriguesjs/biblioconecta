import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_super_secreta";

class AuthUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      //Busca o usuário pelo e-mail
      const usuario = await prisma.usuarios.findUnique({
        where: { email },
        include: { role: true },
      });


      if (!usuario) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }

      //Valida a senha
      const senhaValida = await bcrypt.compare(password, usuario.password);
      if (!senhaValida) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }

      //Gera o token JWT com o campo `subject` (sub)
      const token = jwt.sign(
        {
          email: usuario.email,
          role: usuario.role.nome,
        },
        JWT_SECRET,
        {
          subject: String(usuario.id_usuario),
          expiresIn: "2h",
        }
      );

      //Retorna o token e os dados essenciais
      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        token,
        usuario: {
          id: usuario.id_usuario,
          nome: usuario.name,
          email: usuario.email,
          role: usuario.role.nome,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ erro: "Erro interno no servidor" });
    }
  }
}

export const authUserController = new AuthUserController();
