// src/services/usuarios/DeleteUserService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteUserService {
  async execute(id: number): Promise<void> {
    // 🔹 Verifica se o usuário existe
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: { id_usuario: id },
    });

    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado");
    }

    // 🔹 Deleta o usuário
    await prisma.usuarios.delete({
      where: { id_usuario: id },
    });
  }
}
