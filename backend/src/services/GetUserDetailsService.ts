// src/services/GetUserDetailsService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetUserDetailsService {
  async execute(userId: number) {
    const user = await prisma.usuarios.findUnique({
      where: { id_usuario: userId },
      select: {
        id_usuario: true,
        name: true,
        email: true,
        status: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
}
