import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";

vi.mock("../src/middlewares/IsAuthenticated", () => ({
  isAuthenticated: {
    handle(req: Request, _res: Response, next: NextFunction) {
      const token = req.headers.authorization;

      if (token?.includes("ADMIN")) {
        (req as any).user = { role: "ADMIN" };
      } else {
        (req as any).user = { role: "USER" };
      }

      next();
    }
  }
}));

const mockExecute = vi.fn();

vi.mock("../src/services/CreateBookService.ts", () => {
  return {
    CreateBookService: class {
      execute(params: any) {
        return mockExecute(params);
      }
    }
  };
});

describe("POST /livros", () => {
  let app: any;

  beforeEach(async () => {
    vi.clearAllMocks();

    const { app: application } = await import("../src/server");
    app = application;
  });

  it("should deny access if user is not ADMIN", async () => {
    const response = await request(app)
      .post("/livros")
      .set("Authorization", "Bearer FAKE_USER_TOKEN")
      .send({
        isbn: "123",
        titulo: "Livro Teste",
        autor: "Autor Teste"
      });

    expect(response.status).toBe(403);
    expect(response.body.error).toBe(
      "Acesso negado, somente admins podem criar um novo livro!"
    );
  });

  it("should create a book when user is ADMIN", async () => {
    mockExecute.mockResolvedValue({
      id_livro: 1,
      isbn: "123",
      titulo: "Livro Teste",
      autor: "Autor Teste"
    });

    const response = await request(app)
      .post("/livros")
      .set("Authorization", "Bearer FAKE_ADMIN_TOKEN")
      .send({
        isbn: "123",
        titulo: "Livro Teste",
        autor: "Autor Teste"
      });

    expect(response.status).toBe(201);
    expect(response.body.titulo).toBe("Livro Teste");

    expect(mockExecute).toHaveBeenCalledTimes(1);
    expect(mockExecute).toHaveBeenCalledWith({
      isbn: "123",
      titulo: "Livro Teste",
      autor: "Autor Teste",
      categoria: undefined,
      editora: undefined,
      ano_publicacao: NaN,
      sinopse: undefined,
      capa_url: undefined
    });    
  });

  it("should return 400 if service throws error", async () => {
    mockExecute.mockRejectedValue(new Error("ISBN já cadastrado"));

    const response = await request(app)
      .post("/livros")
      .set("Authorization", "Bearer FAKE_ADMIN_TOKEN")
      .send({
        isbn: "999",
        titulo: "Outro Livro"
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("ISBN já cadastrado");
  });
});
