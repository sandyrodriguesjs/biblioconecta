// src/services/usuarios/GetAllUsersService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetAllUsersService {
  async execute() {
    const usuarios = await prisma.usuarios.findMany({
      include: {
        role: {
          select: { nome: true },
        },
      },
      orderBy: {
        data_cadastro: "desc",
      },
    });

    return usuarios.map((usuario) => ({
      id: usuario.id_usuario,
      nome: usuario.name,
      email: usuario.email,
      status: usuario.status,
      role: usuario.role?.nome,
      data_cadastro: usuario.data_cadastro,
    }));
  }
}
