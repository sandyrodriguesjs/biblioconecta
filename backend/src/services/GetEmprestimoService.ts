import { GetEmprestimosRepository } from "../repositories/GetEmprestimosRepository";

export class GetEmprestimosService {
  async execute() {
    const repo = new GetEmprestimosRepository();
    return await repo.findAll();
  }
}
