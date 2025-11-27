import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/createUser.schema.js";

const prisma = new PrismaClient();

export async function registerUserService(dados: any) {
  const dadosValidados = createUserSchema.parse(dados);

  const senhaHash = await bcrypt.hash(dadosValidados.password, 10);

  const roleUser = await prisma.roles.findUnique({
    where: { nome: "USER" },
  });

  if (!roleUser) {
    throw new Error("Role padrão 'USER' não encontrada. Execute o seed inicial.");
  }

  const email = String(dadosValidados.email).trim().toLowerCase();

  const existente = await prisma.usuarios.findUnique({ where: { email } });
  if (existente) {
    throw new Error("E-mail já cadastrado. Faça login ou recupere a senha.");
  }

  try {
    const novoUsuario = await prisma.usuarios.create({
      data: {
        name: dadosValidados.name,
        email,
        password: senhaHash,
        status: dadosValidados.status ?? "ativo",
        id_role: roleUser.id_role,
      },
      include: {
        role: true,
      },
    });

    return novoUsuario;
  } catch (err: any) {
    if (err?.code === 'P2002' && err?.meta?.target?.includes('email')) {
      throw new Error('E-mail já cadastrado.');
    }
    throw err;
  }
}
