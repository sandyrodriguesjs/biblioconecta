// src/services/usuarios/GetAllUsersService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetAllUsersService {
  async execute() {
    const usuarios = await prisma.usuarios.findMany({
      include: {
        role: { select: { nome: true } },
        emprestimos: {
          where: {
            data_devolucao: null, // Apenas empréstimos ativos
          },
          select: {
            data_prevista_devolucao: true,
          },
          orderBy: {
            data_prevista_devolucao: "asc",
          },
        },
      },
      orderBy: {
        data_cadastro: "desc",
      },
    });

    return usuarios.map((usuario) => {
      const activeLoan = usuario.emprestimos?.[0] ?? null;

      return {
        id: usuario.id_usuario,
        name: usuario.name,
        email: usuario.email,
        status: usuario.status,
        data_prevista_devolucao: activeLoan?.data_prevista_devolucao || null,
      };
    });
  }
}
