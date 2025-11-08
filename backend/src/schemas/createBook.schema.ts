// src/schemas/createBook.schema.ts
import { z } from "zod";

export const createBookSchema = z.object({
  isbn: z.string().min(1, "ISBN é obrigatório"),
  titulo: z.string().min(1, "Título é obrigatório"),
  autor: z.string().min(1, "Autor é obrigatório"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  editora: z.string().min(1, "Editora é obrigatória"),
  ano_publicacao: z.number().int().positive(),
  sinopse: z.string().min(1, "Sinopse é obrigatória"),
});
