import { prisma } from "./setup";
import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../src/server";

describe("POST /register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should register a user successfully", async () => {
    prisma.roles.findUnique.mockResolvedValue({
      id_role: 1,
      nome: "USER",
    });

    prisma.usuarios.findUnique.mockResolvedValue(null);

    prisma.usuarios.create.mockResolvedValue({
      id: "123",
      name: "Mikael",
      email: "mk@mail.com",
      password: "hashed_password",
      status: "ativo",
      id_role: 1,
      role: { nome: "USER" },
    });

    const response = await request(app)
      .post("/register")
      .send({
        name: "Mikael",
        email: "mk@mail.com",
        password: "123456",
      });

    expect(response.status).toBe(201);
    expect(response.body.mensagem).toBe("Usuário criado com sucesso!");
    expect(response.body.usuario.email).toBe("mk@mail.com");
    expect(response.body.usuario.role.nome).toBe("USER");
  });

  it("should return an error if email is already registered", async () => {
    prisma.roles.findUnique.mockResolvedValue({ id_role: 1, nome: "USER" });

    prisma.usuarios.findUnique.mockResolvedValue({
      id: "999",
      email: "mk@mail.com",
    });

    const response = await request(app)
      .post("/register")
      .send({
        name: "Mikael",
        email: "mk@mail.com",
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body.erro).toBe(
      "E-mail já cadastrado. Faça login ou recupere a senha."
    );
  });

  it("should return an error if default USER role is missing", async () => {
    prisma.roles.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .post("/register")
      .send({
        name: "John",
        email: "john@mail.com",
        password: "123456",
      });

    expect(response.status).toBe(400);
    expect(response.body.erro).toBe(
      "Role padrão 'USER' não encontrada. Execute o seed inicial."
    );
  });
});
