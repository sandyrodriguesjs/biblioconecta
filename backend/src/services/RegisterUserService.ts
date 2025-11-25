import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { createUserSchema } from "../schemas/createUser.schema.js";

const prisma = new PrismaClient();

export async function registerUserService(dados: any) {
  //Valida os dados com Zod
  const dadosValidados = createUserSchema.parse(dados);

  //Gera hash da senha antes de salvar
  const senhaHash = await bcrypt.hash(dadosValidados.password, 10);

  //Busca o ID da role "USER"
  const roleUser = await prisma.roles.findUnique({
    where: { nome: "USER" },
  });

  //Se a role não existir, lança erro
  if (!roleUser) {
    throw new Error("Role padrão 'USER' não encontrada. Execute o seed inicial.");
  }

  // Normaliza email (evita duplicatas por case/whitespace)
  const email = String(dadosValidados.email).trim().toLowerCase();

  // Verifica se já existe usuário com esse email
  const existente = await prisma.usuarios.findUnique({ where: { email } });
  if (existente) {
    throw new Error("E-mail já cadastrado. Faça login ou recupere a senha.");
  }

  //4. Cria usuário com a role padrão (tratando possíveis erros do Prisma)
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
    // Prisma unique constraint error
    if (err?.code === 'P2002' && err?.meta?.target?.includes('email')) {
      throw new Error('E-mail já cadastrado.');
    }
    // rethrow original error para debugging se for outro caso
    throw err;
  }
}
