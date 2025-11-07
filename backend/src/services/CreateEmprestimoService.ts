// src/services/circulation/CreateLoanService.ts
import { CirculationRepository } from "../repositories/CirculationRepository";

export class CreateEmprestimoService {
  repo = new CirculationRepository();

  async execute({ userId, exemplarId }: { userId: number; exemplarId: number }) {

    const user = await this.repo.findUserById(userId);
    if (!user) throw new Error("Usuário não encontrado.");

    if (user.status.toLowerCase() !== "ativo") {
      throw new Error("Usuário não está ativo para realizar empréstimos.");
    }

    const copy = await this.repo.findCopyById(exemplarId);
    if (!copy) throw new Error("Exemplar não encontrado.");

    if (copy.status !== "DISPONIVEL") {
      throw new Error("Exemplar não está disponível para empréstimo.");
    }

    const activeLoans = await this.repo.countActiveLoans(userId);
    if (activeLoans >= 3) {
      throw new Error("Usuário já possui o limite de 3 empréstimos ativos.");
    }

    const now = new Date();
    const returnDate = new Date();
    returnDate.setDate(now.getDate() + 14);

    const loan = await this.repo.createLoan({
      id_usuario: userId,
      id_exemplar: exemplarId,
      data_retirada: now,
      data_prevista_devolucao: returnDate,
      renovado: false
    });

    await this.repo.updateCopyStatus(exemplarId, "Emprestado");

    await this.repo.createHistoryEntry({
      id_usuario: userId,
      id_exemplar: exemplarId,
      acao: "LOAN_CREATED"
    });

    return loan;
  }
}
