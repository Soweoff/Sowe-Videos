// src/service/CompraService.ts
import Database from '../db/Database';
import Client from '../model/Client';
import Projeto from '../model/Project';

export default class CompraService {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  // ------ Método compatível com seu fluxo antigo (síncrono) ------
  // assinatura usada no seu teste: registrarCompra(client, projeto)
  public registrarCompra(cliente: Client, projeto: Projeto): void {
    // adiciona projeto ao cliente (internamente já chama addPurchase)
    cliente.adicionarProjetoComprado(projeto);
    // salva projeto no DB (associa por cpf)
    this.db.insertNewProjeto(projeto);
    // garante cliente persistido/atualizado
    this.db.insertNewCliente(cliente);
    // registra histórico de compra
    this.db.addCompra({ clienteCpf: cliente.getCpf(), projetoId: projeto.getId(), isReward: projeto.getEhRecompensa() });
    console.log(`Compra registrada: cliente cpf=${cliente.getCpf()} projeto id=${projeto.getId()}`);
  }

  // ------ Novo método assíncrono baseado em CPF para integração com controller/chatgpt logic ------
  public async registerCompraByCpf(clienteCpf: number, projetoId: number): Promise<{ compra: any; cliente: any; ganhouRecompensa: boolean }> {
    // encontrar cliente
    const cliente = this.db.findClienteByCpf(clienteCpf);
    if (!cliente) throw new Error("Cliente não encontrado");

    // procurar projeto pelo id (se houver) ou criar referência mínima
    const projeto = this.db.getAllProjetos().find(p => p.getId() === projetoId);
    // se não houver projeto existente, você pode optar por criar um projeto genérico; aqui apenas registra a compra
    // registrar compra no histórico
    const compra = this.db.addCompra({ clienteCpf, projetoId, isReward: false });
    // atualizar contadores no cliente
    (cliente as any).addPurchase(false);
    this.db.updateClientByCpf({
      cpf: cliente.getCpf(),
      projetos_comprados: cliente.getProjetos_comprados ? cliente.getProjetos_comprados() : (cliente as any).totalCompras || 0,
      totalCompras: (cliente as any).totalCompras || 0,
      recompensasPendentes: (cliente as any).recompensasPendentes || 0
    });

    const ganhouRecompensa = ((cliente as any).totalCompras % 5 === 0);
    return {
      compra,
      cliente: {
        cpf: cliente.getCpf(),
        totalCompras: (cliente as any).totalCompras || 0,
        recompensasPendentes: (cliente as any).recompensasPendentes || 0
      },
      ganhouRecompensa
    };
  }

  // usar recompensa por CPF
  public usarRecompensaPorCpf(clienteCpf: number): Client {
    const cliente = this.db.findClienteByCpf(clienteCpf);
    if (!cliente) throw new Error("Cliente não encontrado");
    const ok = (cliente as any).useReward ? (cliente as any).useReward() : false;
    if (!ok) throw new Error("Cliente não possui recompensas pendentes");
    // registrar compra do tipo reward
    this.db.addCompra({ clienteCpf, projetoId: 0, isReward: true });
    this.db.updateClientByCpf({
      cpf: cliente.getCpf(),
      recompensasPendentes: (cliente as any).recompensasPendentes || 0
    });
    return cliente;
  }
}
