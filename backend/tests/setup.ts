import { vi } from "vitest";

export const prisma = {
  usuarios: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
  roles: {
    findUnique: vi.fn(),
  },
};

;(globalThis as any).prisma = prisma;

function MockPrismaClient(this: any) {
  return (globalThis as any).prisma;
}

vi.mock("@prisma/client", () => ({
  PrismaClient: MockPrismaClient,
}));