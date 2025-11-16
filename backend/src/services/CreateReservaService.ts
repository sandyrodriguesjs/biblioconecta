import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ICreateReserva {
  id_usuario: number | string;
  id_livro: number | string;
}

export class CreateReservaService {
  async execute({ id_usuario, id_livro }: ICreateReserva) {
    const userId = Number(id_usuario);
    const bookId = Number(id_livro);

    if (isNaN(userId) || isNaN(bookId)) {
      throw new Error("IDs inválidos fornecidos.");
    }

    const livroExiste = await prisma.livros.findUnique({
      where: { id_livro: bookId },
    });
    if (!livroExiste) {
      throw new Error("Livro não encontrado");
    }

    const usuarioExiste = await prisma.usuarios.findUnique({
      where: { id_usuario: userId },
    });
    if (!usuarioExiste) {
      throw new Error("Usuário não encontrado");
    }

    const reservaExistente = await prisma.reservas.findFirst({
      where: {
        id_usuario: userId,
        id_livro: bookId,
        status: "ATIVA",
      },
    });
    if (reservaExistente) {
      throw new Error("Você já possui uma reserva ativa para este livro");
    }

    const exemplarDisponivel = await prisma.exemplares.findFirst({
      where: {
        id_livro: bookId,
        status: "DISPONIVEL",
      },
    });
    if (!exemplarDisponivel) {
      throw new Error("Nenhum exemplar disponível para reserva");
    }

    await prisma.exemplares.update({
      where: { id_exemplar: exemplarDisponivel.id_exemplar },
      data: { status: "RESERVADO" },
    });

    const novaReserva = await prisma.reservas.create({
      data: {
        id_usuario: userId,
        id_livro: bookId,
        id_exemplar: exemplarDisponivel.id_exemplar,
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
        exemplar: {
          select: { id_exemplar: true, codigo_exemplar: true, status: true },
        },
      },
    });

    return {
      ...novaReserva,
      mensagem: `Reserva criada com sucesso. O exemplar ${exemplarDisponivel.codigo_exemplar} foi reservado.`,
    };
  }
}
