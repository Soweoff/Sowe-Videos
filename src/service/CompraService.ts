import Database from "../db/Database";
import Client from "../model/Client";
import Projeto from "../model/Project";

export default class CompraService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  public registrarCompra(cliente: Client, projeto: Projeto): void {
    cliente.adicionarProjetoComprado(projeto);
    this.db.insertNewProjeto(projeto);
    this.db.insertNewCliente(cliente);
    this.db.addCompra({ clienteCpf: cliente.getCpf(), projetoId: projeto.getId(), isReward: projeto.getEhRecompensa() });
  }

  public async registerCompraByCpf(clienteCpf: number, projetoId: number) {
    const cliente = this.db.findClienteByCpf(clienteCpf);
    if (!cliente) throw new Error("Cliente não encontrado");
    const projeto = this.db.getAllProjetos().find(p => p.getId() === projetoId);
    const compra = this.db.addCompra({ clienteCpf, projetoId, isReward: false });
    (cliente as any).addPurchase(false);
    this.db.updateClientByCpf({
      cpf: cliente.getCpf(),
      projetos_comprados: cliente.getProjetos_comprados ? cliente.getProjetos_comprados() : (cliente as any).totalCompras || 0,
      totalCompras: (cliente as any).totalCompras || 0,
      recompensasPendentes: (cliente as any).recompensasPendentes || 0
    });
    const ganhouRecompensa = ((cliente as any).totalCompras % 5 === 0);
    return { compra, cliente: { cpf: cliente.getCpf(), totalCompras: (cliente as any).totalCompras || 0, recompensasPendentes: (cliente as any).recompensasPendentes || 0 }, ganhouRecompensa };
  }

  public usarRecompensaPorCpf(clienteCpf: number): Client {
    const cliente = this.db.findClienteByCpf(clienteCpf);
    if (!cliente) throw new Error("Cliente não encontrado");
    const ok = (cliente as any).useReward ? (cliente as any).useReward() : false;
    if (!ok) throw new Error("Cliente não possui recompensas pendentes");
    this.db.addCompra({ clienteCpf, projetoId: 0, isReward: true });
    this.db.updateClientByCpf({ cpf: cliente.getCpf(), recompensasPendentes: (cliente as any).recompensasPendentes || 0 });
    return cliente;
  }
}
