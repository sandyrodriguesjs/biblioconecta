import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetBooksService {
  async listAllBooks() {
    return await prisma.livros.findMany({
      where: {
        exemplares: {
          some: {
            status: "DISPONIVEL"
          }
        }
      },
      include: {
        exemplares: true,
        reservas: true,
        avaliacoes: true,
      },
    });
  }

  async listBooksById(id_livro: number) {
    const livro = await prisma.livros.findUnique({
      where: { id_livro },
      include: {
        exemplares: true,
        reservas: true,
        avaliacoes: true,
      },
    });

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    return livro;
  }
}
