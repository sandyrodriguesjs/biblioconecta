import { PrismaClient } from "@prisma/client";

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
    // ✅ Verifica se o ISBN já existe
    const existingBook = await prisma.livros.findUnique({
      where: { isbn: data.isbn },
    });

    if (existingBook) {
      throw new Error("Livro com este ISBN já está cadastrado.");
    }

    // 📘 Cria o novo livro
    const novoLivro = await prisma.livros.create({
      data: {
        isbn: data.isbn,
        titulo: data.titulo,
        autor: data.autor,
        categoria: data.categoria,
        editora: data.editora,
        ano_publicacao: data.ano_publicacao,
        sinopse: data.sinopse,
      },
    });

    //Cria automaticamente um exemplar DISPONÍVEL
    const codigo_exemplar = `EXEMP-${novoLivro.id_livro}-${Date.now()}`;

    const novoExemplar = await prisma.exemplares.create({
      data: {
        id_livro: novoLivro.id_livro,
        codigo_exemplar,
        status: "DISPONIVEL",
      },
    });

    //Retorna o livro e o exemplar criado
    return {
      ...novoLivro,
      exemplar: novoExemplar,
      mensagem: "Livro e exemplar cadastrados com sucesso!",
    };
  }
}
