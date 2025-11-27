// src/middlewares/IsAuthenticated.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

interface CustomJwtPayload extends JwtPayload {
  sub: string;
  email: string;
  role: string;
}

class IsAuthenticated {
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      if (!JWT_SECRET) throw new Error("JWT_SECRET não definido no ambiente");

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ erro: "Token de autenticação não fornecido" });
      }

      const [scheme, token] = authHeader.split(" ");

      if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ erro: "Formato do token inválido" });
      }

      const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

      if (!decoded.sub) {
        return res.status(401).json({ erro: "Token sem identificador de usuário" });
      }

      (req as any).user = {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      };

      (req as any).user_id = decoded.sub;

      return next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ erro: "Token expirado. Faça login novamente." });
      }

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ erro: "Token inválido. Faça login novamente." });
      }

      console.error("Erro ao validar token:", error);
      return res.status(500).json({ erro: "Erro interno na verificação do token" });
    }
  }
}

export const isAuthenticated = new IsAuthenticated();
