// src/services/usuarios/DeleteUserService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteUserService {
  async execute(id: number): Promise<void> {
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: { id_usuario: id },
    });

    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado.");
    }

    const temEmprestimos = await prisma.emprestimos.findFirst({
      where: { id_usuario: id }
    });

    const temReservas = await prisma.reservas.findFirst({
      where: { id_usuario: id }
    });

    const temAvaliacoes = await prisma.avaliacoes.findFirst({
      where: { id_usuario: id }
    });

    const temHistorico = await prisma.historico.findFirst({
      where: { id_usuario: id }
    });

    if (temEmprestimos || temReservas || temAvaliacoes || temHistorico) {
      throw new Error(
        "Este usuário possui livros ou registros relacionados e não pode ser excluído."
      );
    }

    await prisma.usuarios.delete({
      where: { id_usuario: id },
    });
  }
}
