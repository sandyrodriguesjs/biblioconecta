import { prisma } from "./setup";
import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../src/server";

vi.mock("bcryptjs", () => ({
  default: {
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => {
  const signFn = vi.fn(() => "fake.jwt.token");
  return {
    default: { sign: signFn },
    sign: signFn,
  };
});

describe("POST /login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should authenticate the user and return a token", async () => {
    prisma.usuarios.findUnique.mockResolvedValue({
      id_usuario: 10,
      name: "Mikael",
      email: "mk@mail.com",
      password: "hashed_password",
      status: "ATIVO",
      role: { nome: "USER" },
    });

    const bcrypt = await import("bcryptjs");
    (bcrypt.default.compare as any).mockResolvedValue(true);

    const response = await request(app)
      .post("/login")
      .send({
        email: "mk@mail.com",
        password: "12345678",
      });

    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe("Login realizado com sucesso!");
    expect(response.body.token).toBe("fake.jwt.token");
    expect(response.body.usuario.email).toBe("mk@mail.com");
    expect(response.body.usuario.role).toBe("USER");
  });

  it("should return 401 if user does not exist", async () => {
    prisma.usuarios.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .post("/login")
      .send({
        email: "unknown@mail.com",
        password: "123456",
      });

    expect(response.status).toBe(401);
    expect(response.body.erro).toBe("Credenciais inválidas");
  });

  it("should return 403 if user is blocked", async () => {
    prisma.usuarios.findUnique.mockResolvedValue({
      id_usuario: 99,
      name: "João",
      email: "joao@mail.com",
      password: "any_hash",
      status: "BLOQUEADO",
      role: { nome: "USER" },
    });

    const response = await request(app)
      .post("/login")
      .send({
        email: "joao@mail.com",
        password: "123456",
      });

    expect(response.status).toBe(403);
    expect(response.body.erro).toBe(
      "Seu acesso foi bloqueado. Consulte a administração da biblioteca."
    );
  });

  it("should return 401 if password is incorrect", async () => {
    prisma.usuarios.findUnique.mockResolvedValue({
      id_usuario: 10,
      name: "Mikael",
      email: "mk@mail.com",
      password: "hashed_password",
      status: "ATIVO",
      role: { nome: "USER" },
    });

    const bcrypt = await import("bcryptjs");
    (bcrypt.default.compare as any).mockResolvedValue(false);

    const response = await request(app)
      .post("/login")
      .send({
        email: "mk@mail.com",
        password: "wrongpass",
      });

    expect(response.status).toBe(401);
    expect(response.body.erro).toBe("Credenciais inválidas");
  });

  it("should return 500 if an internal error occurs", async () => {
    prisma.usuarios.findUnique.mockRejectedValue(new Error("DB error"));

    const response = await request(app)
      .post("/login")
      .send({
        email: "mk@mail.com",
        password: "123456",
      });

    expect(response.status).toBe(500);
    expect(response.body.erro).toBe("Erro interno no servidor");
  });
});
