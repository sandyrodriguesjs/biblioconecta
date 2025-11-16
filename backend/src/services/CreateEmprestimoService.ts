// src/services/circulation/CreateLoanService.ts
import { CirculationRepository } from "../repositories/CirculationRepository";

export class CreateEmprestimoService {
  repo = new CirculationRepository();

  async execute({ userId, exemplarId }: { userId: number; exemplarId: number }) {

    // Verifica usuário
    const user = await this.repo.findUserById(userId);
    if (!user) throw new Error("Usuário não encontrado.");

    if (user.status.toLowerCase() !== "ativo") {
      throw new Error("Usuário não está ativo para realizar empréstimos.");
    }

    // Verifica exemplar
    const copy = await this.repo.findCopyById(exemplarId);
    if (!copy) throw new Error("Exemplar não encontrado.");

    // Agora o exemplar PRECISA estar reservado
    if (copy.status !== "RESERVADO") {
      throw new Error("Este exemplar não está reservado para empréstimo.");
    }

    // Verifica se o usuário de fato reservou este exemplar
    const reservation = await this.repo.findActiveReservationForCopy(userId, exemplarId);
    if (!reservation) {
      throw new Error("Você não possui uma reserva ativa para este exemplar.");
    }

    // Verifica limite de empréstimos
    const activeLoans = await this.repo.countActiveLoans(userId);
    if (activeLoans >= 3) {
      throw new Error("Usuário já possui o limite de 3 empréstimos ativos.");
    }

    // Datas do empréstimo
    const now = new Date();
    const returnDate = new Date();
    returnDate.setDate(now.getDate() + 14);

    // Cria o empréstimo
    const loan = await this.repo.createLoan({
      id_usuario: userId,
      id_exemplar: exemplarId,
      data_retirada: now,
      data_prevista_devolucao: returnDate,
      renovado: false
    });

    // Atualiza status exemplar: RESERVADO → EMPRESTADO
    await this.repo.updateCopyStatus(exemplarId, "EMPRESTADO");

    // Atualiza reserva para CONCLUIDA
    await this.repo.updateReservationStatus(reservation.id_reserva, "CONCLUIDA");

    // Registra histórico
    await this.repo.createHistoryEntry({
      id_usuario: userId,
      id_exemplar: exemplarId,
      acao: "LOAN_CREATED"
    });

    return loan;
  }
}
