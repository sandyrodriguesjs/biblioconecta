import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteBookService {
  async execute(id: number) {

    const livro = await prisma.livros.findUnique({
      where: { id_livro: id },
    });

    if (!livro) {
      throw new Error("Livro não encontrado");
    }

    //Deleta reservas relacionadas
    await prisma.reservas.deleteMany({
      where: { id_livro: id }
    });

    //Deleta exemplares relacionados
    await prisma.exemplares.deleteMany({
      where: { id_livro: id }
    });

    await prisma.livros.delete({
      where: { id_livro: id },
    });

    return { mensagem: "Livro deletado com sucesso" };
  }
}
