import Client from "../model/Client";

export default interface IClientRepository {
  insert(cliente: Client): void;
  findByCpf(cpf: number): Client | undefined;
  getAll(): Client[];
}
