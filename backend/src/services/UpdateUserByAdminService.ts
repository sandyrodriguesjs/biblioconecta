// src/services/users/EditUserByAdminService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface EditUserDTO {
  name?: string;
  email?: string;
  id_role?: number;
}

export class EditUserByAdminService {
  async execute(userId: number, data: EditUserDTO) {
    const user = await prisma.usuarios.findUnique({
      where: { id_usuario: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    const updated = await prisma.usuarios.update({
      where: { id_usuario: userId },
      data,
    });

    const { password, ...safeUser } = updated;

    return safeUser;
  }
}
