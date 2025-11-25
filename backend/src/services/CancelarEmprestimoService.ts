import { CancelarEmprestimoRepository } from "../repositories/CancelarEmprestimoRepository";

export class CancelarEmprestimoService {
  async execute(id: number) {
    const repo = new CancelarEmprestimoRepository();
    return await repo.cancelar(id);
  }
}
