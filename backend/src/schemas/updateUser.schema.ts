import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .max(100, "O nome pode ter no máximo 100 caracteres.")
    .transform((value) => value.trim())
    .optional(),

  email: z
    .string()
    .email("Formato de e-mail inválido.")
    .transform((value) => value.toLowerCase().trim())
    .optional(),

  password: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(100, "A senha pode ter no máximo 100 caracteres.")
    .optional(),
});
