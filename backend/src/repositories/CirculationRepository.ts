// src/repositories/circulation/CirculationRepository.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class CirculationRepository {

  async findUserById(id: number) {
    return prisma.usuarios.findUnique({ where: { id_usuario: id } });
  }

  async findCopyById(id: number) {
    return prisma.exemplares.findUnique({ where: { id_exemplar: id } });
  }

  async countActiveLoans(userId: number) {
    return prisma.emprestimos.count({
      where: {
        id_usuario: userId,
        data_devolucao: null
      }
    });
  }

  async findActiveReservationForCopy(userId: number, exemplarId: number) {
    return prisma.reservas.findFirst({
      where: {
        id_usuario: userId,
        id_exemplar: exemplarId,
        status: "ATIVA",
      },
    });
  }

  async updateReservationStatus(reservaId: number, status: string) {
    return prisma.reservas.update({
      where: { id_reserva: reservaId },
      data: { status },
    });
  }

  async createLoan(data: any) {
    return prisma.emprestimos.create({ data });
  }

  async updateCopyStatus(copyId: number, status: string) {
    return prisma.exemplares.update({
      where: { id_exemplar: copyId },
      data: { status }
    });
  }

  async createHistoryEntry(data: any) {
    return prisma.historico.create({ data });
  }

  async updateLoanReturnDate(loanId: number) {
    return prisma.emprestimos.update({
      where: { id_emprestimo: loanId },
      data: { data_devolucao: new Date() }
    });
  }

  async updateLoanRenewal(loanId: number, newDate: Date) {
    return prisma.emprestimos.update({
      where: { id_emprestimo: loanId },
      data: {
        data_prevista_devolucao: newDate,
        renovado: true
      }
    });
  }

  async findLoanById(id: number) {
    return prisma.emprestimos.findUnique({
      where: { id_emprestimo: id },
      include: {
        exemplar: { include: { livro: true } },
        usuario: true,
      }
    });
  }
}
