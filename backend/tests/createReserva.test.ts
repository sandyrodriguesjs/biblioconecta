import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Request, Response, NextFunction } from "express";

vi.mock("../src/middlewares/IsAuthenticated", () => ({
  isAuthenticated: {
    handle(req: Request, _res: Response, next: NextFunction) {
      const token = req.headers.authorization;

      if (token?.includes("FAKE_USER_TOKEN")) {
        (req as any).user_id = 10; // simula usuário logado
      }

      next();
    }
  }
}));

const mockExecute = vi.fn();

class CreateReservaServiceMock {
  execute(...args: any[]) {
    return mockExecute(...args);
  }
}

vi.mock("../src/services/CreateReservaService", () => {
  return {
    CreateReservaService: CreateReservaServiceMock
  };
});

describe("POST /reservas", () => {
  let app: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const appModule = await import("../src/server");
    app = appModule.app;
  });

  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app)
      .post("/reservas")
      .send({ id_livro: 1 });

    expect(response.status).toBe(401);
    expect(response.body.erro).toBe("Usuário não autenticado.");
  });

  it("should return 400 if id_livro is missing", async () => {
    const response = await request(app)
      .post("/reservas")
      .set("Authorization", "Bearer FAKE_USER_TOKEN")
      .send({}); // sem id_livro

    expect(response.status).toBe(400);
    expect(response.body.erro).toBe("O campo id_livro é obrigatório.");
  });

  it("should create a reservation when user is logged in", async () => {
    mockExecute.mockResolvedValue({
      id_reserva: 123,
      id_usuario: 10,
      id_livro: 1,
      mensagem: "Reserva criada com sucesso!"
    });

    const response = await request(app)
      .post("/reservas")
      .set("Authorization", "Bearer FAKE_USER_TOKEN")
      .send({ id_livro: 1 });

    expect(response.status).toBe(201);
    expect(response.body.id_reserva).toBe(123);
    expect(response.body.mensagem).toBe("Reserva criada com sucesso!");
    expect(mockExecute).toHaveBeenCalledWith({
      id_usuario: 10,
      id_livro: 1
    });
  });

  it("should return 400 if service throws an error", async () => {
    mockExecute.mockRejectedValue(new Error("Nenhum exemplar disponível"));

    const response = await request(app)
      .post("/reservas")
      .set("Authorization", "Bearer FAKE_USER_TOKEN")
      .send({ id_livro: 1 });

    expect(response.status).toBe(400);
    expect(response.body.erro).toBe("Nenhum exemplar disponível");
    expect(mockExecute).toHaveBeenCalledTimes(1);
  });
});
