// src/services/circulation/RenewLoanService.ts
import { CirculationRepository } from "../repositories/CirculationRepository";

export class RenovarEmprestimoService {
  repo = new CirculationRepository();

  async execute(loanId: number) {

    const loan = await this.repo.findLoanById(loanId);
    if (!loan) throw new Error("Empréstimo não encontrado.");

    if (loan.renovado) {
      throw new Error("Este empréstimo já foi renovado anteriormente.");
    }

    const bookId = loan.exemplar.id_livro;

    // const reservation = await this.repo.findReservationForOtherUser(bookId, loan.id_usuario);
    // if (reservation) {
    //   throw new Error("Não é possível renovar: há reservas para outros usuários.");
    // }

    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 14);

    return this.repo.updateLoanRenewal(loanId, newDate);
  }
}
