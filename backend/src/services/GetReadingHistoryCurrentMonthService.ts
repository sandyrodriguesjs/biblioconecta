import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GetReadingHistoryCurrentMonthService {
  async execute(userId: number) {

    if (!userId) {
      throw new Error("Usuário inválido.");
    }

    //Obtém mês e ano atual
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    //Busca empréstimos realizados neste mês (pela data_retirada)
    const history = await prisma.emprestimos.findMany({
      where: {
        id_usuario: userId,
        data_retirada: {
          gte: startDate,
          lt: endDate,
        }
      },
      include: {
        exemplar: {
          include: {
            livro: true,
          },
        },
      },
      orderBy: {
        data_retirada: "desc",
      },
    });

    return history;
  }
}
