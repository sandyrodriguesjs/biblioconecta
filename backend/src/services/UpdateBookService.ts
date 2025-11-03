import { PrismaClient } from "@prisma/client";
import { updateBookSchema } from "../schemas/updateBook.schema";

const prisma = new PrismaClient();

export class UpdateBookService {
  async execute(id: number, data: any) {
    // 🔹 Validação Zod
    const validatedData = updateBookSchema.parse(data);

    // 🔹 Verifica se o livro existe
    const livroExiste = await prisma.livros.findUnique({
      where: { id_livro: id },
    });

    if (!livroExiste) {
      throw new Error("Livro não encontrado");
    }

    // 🔹 Atualiza o livro
    const livroAtualizado = await prisma.livros.update({
      where: { id_livro: id },
      data: validatedData,
    });

    return livroAtualizado;
  }
}
