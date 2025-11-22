// src/services/users/BlockUserIfLateService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BlockUserIfLateService {
    async execute(userId: number) {

        const today = new Date();

        // const lateLoan = await prisma.emprestimos.findFirst({
        //   where: {
        //     id_usuario: userId,
        //     data_devolucao: null,
        //     data_prevista_devolucao: { lt: today }
        //   }
        // });

        // if (!lateLoan) {
        //   throw new Error("Este usuário não possui empréstimos atrasados.");
        // }

        const updated = await prisma.usuarios.update({
            where: { id_usuario: userId },
            data: { status: "BLOQUEADO" }
        });

        const { password, ...safeUser } = updated;

        return safeUser;

    }
}
