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

vi.mock("../src/services/CreateEmprestimoService.ts", () => {
  return {
    CreateEmprestimoService: class {
      constructor() {}
      execute(params: any) {
        return mockExecute(params);
      }
    }
  };
});

describe("POST /emprestimos", () => {
  let app: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { app: application } = await import("../src/server");
    app = application;
  });

  it("should allow ADMIN to approve a loan and return 201", async () => {
    mockExecute.mockResolvedValue({
      id_emprestimo: 55,
      id_usuario: 1,
      id_exemplar: 5
    });

    const response = await request(app)
      .post("/emprestimos")
      .set("Authorization", "Bearer ADMIN")
      .send({ userId: 1, exemplarId: 5 });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id_emprestimo: 55,
      id_usuario: 1,
      id_exemplar: 5
    });

    expect(mockExecute).toHaveBeenCalledTimes(1);
    expect(mockExecute).toHaveBeenCalledWith({ userId: 1, exemplarId: 5 });
  });

  it("should deny non-admin users when creating a loan", async () => {
    const response = await request(app)
      .post("/emprestimos")
      .set("Authorization", "Bearer USER")
      .send({ userId: 1, exemplarId: 5 });

    expect(response.status).toBe(403);
    expect(response.body.error).toBe(
      "Acesso negado, somente admins podem aprovar um emprestimo!"
    );

    expect(mockExecute).not.toHaveBeenCalled();
  });
});
