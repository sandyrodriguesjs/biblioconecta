import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class GetEmprestimosRepository {
  async findAll() {
    return await prisma.emprestimos.findMany({
      where: {
        data_devolucao: null,
      },
      orderBy: { id_emprestimo: "desc" },
      include: {
        usuario: { select: { name: true, email: true } },
        exemplar: {
          select: {
            codigo_exemplar: true,
            livro: { select: { titulo: true } },
          },
        },
      },
    });
  }
}
