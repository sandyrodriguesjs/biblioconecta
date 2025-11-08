import { PrismaClient } from "@prisma/client";
import { createBookSchema } from "../schemas/createBook.schema";

const prisma = new PrismaClient();

interface CreateBookDTO {
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  editora: string;
  ano_publicacao: number;
  sinopse: string;
}

export class CreateBookService {
  async execute(data: CreateBookDTO) {

    //Validação Zod (agora aplicando!)
    const validatedData = createBookSchema.parse(data);
    
    //Verifica ISBN já existente
    const existingBook = await prisma.livros.findUnique({
      where: { isbn: validatedData.isbn },
    });

    if (existingBook) {
      throw new Error("Livro com este ISBN já está cadastrado.");
    }

    //Cria o novo livro usando validatedData
    const novoLivro = await prisma.livros.create({
      data: {
        isbn: validatedData.isbn,
        titulo: validatedData.titulo,
        autor: validatedData.autor,
        categoria: validatedData.categoria,
        editora: validatedData.editora,
        ano_publicacao: validatedData.ano_publicacao,
        sinopse: validatedData.sinopse,
      },
    });

    //Cria exemplar gerado automaticamente
    const codigo_exemplar = `EXEMP-${novoLivro.id_livro}-${Date.now()}`;

    const novoExemplar = await prisma.exemplares.create({
      data: {
        id_livro: novoLivro.id_livro,
        codigo_exemplar,
        status: "DISPONIVEL",
      },
    });

    return {
      ...novoLivro,
      exemplar: novoExemplar,
      mensagem: "Livro e exemplar cadastrados com sucesso!",
    };
  }
}
