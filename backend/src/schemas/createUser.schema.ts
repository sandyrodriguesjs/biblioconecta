import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres.")
    .transform((value) => value.trim()),

  email: z
    .string()
    .email("Formato de e-mail inválido.")
    .transform((value) => value.toLowerCase().trim()),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres."),

  status: z
    .string()
    .default("ATIVO")
    .transform((s) => s.trim().toUpperCase())
    .refine((s) => s === "ATIVO" || s === "BLOQUEADO", {
      message: "Status deve ser ATIVO ou BLOQUEADO.",
    })
});
