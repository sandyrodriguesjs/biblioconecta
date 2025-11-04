import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { usuarioSchema } from "../schemas/user.schema.js";

const prisma = new PrismaClient();

export async function registerUserService(dados: any) {
  //1. Valida os dados com Zod
  const dadosValidados = usuarioSchema.parse(dados);

  //2. Gera hash da senha antes de salvar
  const senhaHash = await bcrypt.hash(dadosValidados.password, 10);

  //3. Busca o ID da role "USER"
  const roleUser = await prisma.roles.findUnique({
    where: { nome: "USER" },
  });

  // Se a role não existir, lança erro
  if (!roleUser) {
    throw new Error("Role padrão 'USER' não encontrada. Execute o seed inicial.");
  }

  //4. Cria usuário com a role padrão
  const novoUsuario = await prisma.usuarios.create({
    data: {
      name: dadosValidados.name,
      email: dadosValidados.email,
      password: senhaHash,
      status: dadosValidados.status ?? "ativo",
      id_role: roleUser.id_role,
    },
    include: {
      role: true,
    },
  });

  return novoUsuario;
}
