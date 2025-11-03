import { z } from "zod";

export const updateBookSchema = z.object({
  isbn: z
    .string()
    .min(10, "ISBN deve ter pelo menos 10 caracteres")
    .max(20, "ISBN muito longo")
    .optional(),

  titulo: z
    .string()
    .min(2, "Título deve ter pelo menos 2 caracteres")
    .max(255)
    .optional(),

  autor: z
    .string()
    .min(2, "Autor deve ter pelo menos 2 caracteres")
    .max(255)
    .optional(),

  editora: z
    .string()
    .min(2, "Editora deve ter pelo menos 2 caracteres")
    .max(255)
    .optional(),

  categoria: z
    .string()
    .min(2, "Editora deve ter pelo menos 2 caracteres")
    .max(255)
    .optional(),

  sinopse: z
    .string()
    .min(10, "Sinopse deve ter pelo menos 10 caracteres")
    .optional(),
});
