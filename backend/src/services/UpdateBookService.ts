import { PrismaClient } from "@prisma/client";
import { cloudinary } from "../config/cloudinary";
import { updateBookSchema } from "../schemas/updateBook.schema";

const prisma = new PrismaClient();

export class UpdateBookService {
  async execute(id: number, data: any, file?: Express.Multer.File) {
    const validatedData = updateBookSchema.parse(data);

    const livro = await prisma.livros.findUnique({
      where: { id_livro: id },
    });

    if (!livro) {
      throw new Error("Livro não encontrado");
    }

    let capaUrl = livro.capa_url;

    if (file) {
      const uploaded = await cloudinary.uploader.upload(file.path, {
        folder: "biblioteca/livros",
      });

      capaUrl = uploaded.secure_url;
    }

    const livroAtualizado = await prisma.livros.update({
      where: { id_livro: id },
      data: {
        ...validatedData,
        capa_url: capaUrl,
      },
    });

    return livroAtualizado;
  }
}
