import Projeto from "../model/Project";
import IRepository from "../repositories/IRepository";

export default interface IProjectRepository extends IRepository<Projeto, number> {
  getByClientCpf(cpf: number): Projeto[];
  getSortedByPrice(desc?: boolean): Projeto[];
}
