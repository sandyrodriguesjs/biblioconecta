import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateReserva {
  id_usuario: number;
  id_livro: number;
}

export class CreateReservaService {
  async execute({ id_usuario, id_livro }: ICreateReserva) {
    // Verifica se o livro existe
    const livroExiste = await prisma.livros.findUnique({
      where: { id_livro },
    });

    if (!livroExiste) {
      throw new Error("Livro não encontrado");
    }

    // Verifica se o usuário existe
    const usuarioExiste = await prisma.usuarios.findUnique({
      where: { id_usuario },
    });

    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado");
    }

    // Verifica se o usuário já possui uma reserva ativa desse livro
    const reservaExistente = await prisma.reservas.findFirst({
      where: {
        id_usuario,
        id_livro,
        status: "ATIVA",
      },
    });

    if (reservaExistente) {
      throw new Error("Você já possui uma reserva ativa para este livro");
    }

    // Procura um exemplar disponível desse livro
    const exemplarDisponivel = await prisma.exemplares.findFirst({
      where: {
        id_livro,
        status: "DISPONIVEL",
      },
    });

    if (!exemplarDisponivel) {
      throw new Error("Nenhum exemplar disponível para reserva");
    }

    // Atualiza o exemplar para 'RESERVADO'
    await prisma.exemplares.update({
      where: { id_exemplar: exemplarDisponivel.id_exemplar },
      data: { status: "RESERVADO" },
    });

    // Cria a reserva como 'ATIVA'
    const novaReserva = await prisma.reservas.create({
      data: {
        id_usuario,
        id_livro,
        data_reserva: new Date(),
        status: "ATIVA",
        posicao_fila: 1,
      },
      include: {
        usuario: {
          select: { id_usuario: true, name: true, email: true },
        },
        livro: {
          select: { id_livro: true, titulo: true, autor: true },
        },
      },
    });

    return {
      ...novaReserva,
      mensagem: `Reserva criada com sucesso. O exemplar ${exemplarDisponivel.codigo_exemplar} foi reservado.`,
    };
  }
}
