import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export class UpdateUserService {
  async execute(userId: number, data: UpdateUserData) {
    if (!userId) {
      throw new Error("ID do usuário não encontrado. Token inválido ou ausente.");
    }

    const { name, email, password } = data;

    const userExists = await prisma.usuarios.findUnique({
      where: { id_usuario: userId },
    });

    if (!userExists) {
      throw new Error("Usuário não encontrado");
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.usuarios.update({
      where: { id_usuario: userId },
      data: {
        name,
        email,
        ...(hashedPassword && { password: hashedPassword }),
      },
      select: {
        id_usuario: true,
        name: true,
        email: true,
        status: true,
        data_cadastro: true,
      },
    });

    return updatedUser;
  }
}
