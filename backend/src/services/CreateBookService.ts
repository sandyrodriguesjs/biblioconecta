import { PrismaClient } from "@prisma/client";
import { createBookSchema } from "../schemas/createBook.schema";
import { cloudinary } from "../config/cloudinary";
import fs from "fs";

const prisma = new PrismaClient();

interface CreateBookDTO {
  isbn: string;
  titulo: string;
  autor: string;
  categoria: string;
  editora: string;
  ano_publicacao: number;
  sinopse: string;
  capa_url?: string;
}

export class CreateBookService {
  async execute(data: CreateBookDTO) {

    const validatedData = createBookSchema.parse(data);

    let capa_url: string | undefined = undefined;

    if (data.capa_url) {
      const uploadResult = await cloudinary.uploader.upload(data.capa_url, {
        folder: "biblioteca/livros",
      });

      capa_url = uploadResult.secure_url;

      fs.unlinkSync(data.capa_url);
    }

    const already = await prisma.livros.findUnique({
      where: { isbn: validatedData.isbn },
    });

    if (already) {
      throw new Error("Livro com este ISBN já está cadastrado.");
    }

    const novoLivro = await prisma.livros.create({
      data: {
        ...validatedData,
        capa_url,
      },
    });

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
      mensagem: "Livro cadastrado com sucesso!",
    };
  }
}
