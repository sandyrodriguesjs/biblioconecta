// src/services/circulation/RegisterReturnService.ts
import { CirculationRepository } from "../repositories/CirculationRepository";

export class RegisterDevolucaoService {
  repo = new CirculationRepository();

  async execute(loanId: number) {

    const loan = await this.repo.findLoanById(loanId);
    if (!loan) throw new Error("Empréstimo não encontrado.");

    if (loan.data_devolucao) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    await this.repo.updateLoanReturnDate(loanId);
    await this.repo.updateCopyStatus(loan.id_exemplar, "Disponível");

    await this.repo.createHistoryEntry({
      id_usuario: loan.id_usuario,
      id_exemplar: loan.id_exemplar,
      acao: "RETURN_REGISTERED"
    });

    return { message: "Devolução registrada com sucesso." };
  }
}
