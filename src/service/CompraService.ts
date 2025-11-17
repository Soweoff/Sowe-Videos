// src/service/CompraService.ts
import Client from "../model/Client";
import Projeto from "../model/Project";
import Database from "../db/Database";
import AppError from "../errors/AppError";

export default class CompraService {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public registrarCompra(cliente: Client, projeto: Projeto): void {
    try {
      if (!cliente) throw new AppError("Cliente inválido", 422);
      if (!projeto) throw new AppError("Projeto inválido", 422);
      if (projeto.getPreco() < 0) throw new AppError("Preço do projeto inválido", 422);

      if (projeto.getEhRecompensa()) {
        console.log(`O cliente ${cliente.getName()} resgatou o projeto grátis: ${projeto.getName()}`);
      } else {
        cliente.adicionarProjetoComprado(projeto);
        // garante que cliente está no DB
        this.database.insertNewCliente(cliente);
        this.database.insertNewProjeto(projeto);
        console.log(`Projeto "${projeto.getName()}" comprado por ${cliente.getName()} por R$${projeto.getPreco()}`);
      }

      if (cliente.podeResgatarRecompensa()) {
        console.log(`✅ O cliente ${cliente.getName()} ganhou direito a um projeto grátis!`);
      }
    } catch (err) {
      if (err instanceof AppError) {
        console.error(`Erro de aplicação: ${err.message}`);
        throw err;
      } else {
        console.error("Erro inesperado ao registrar compra:", err);
        throw new AppError("Erro inesperado ao registrar compra", 500);
      }
    }
  }

  public resgatarRecompensa(cliente: Client, nomeProjeto: string): void {
    try {
      if (!cliente) throw new AppError("Cliente inválido", 422);

      if (cliente.podeResgatarRecompensa()) {
        const id = this.database.getAllProjetos().length + 1;
        const projetoGratis = new Projeto(id, nomeProjeto, cliente, null as any, 0);
        projetoGratis.setEhRecompensa(true);

        this.database.insertNewProjeto(projetoGratis);
        cliente.resetarContagemProjetos();
        this.database.insertNewCliente(cliente);
        console.log(`🎁 Projeto grátis "${projetoGratis.getName()}" resgatado para ${cliente.getName()}`);
      } else {
        console.log(`⚠️ O cliente ${cliente.getName()} ainda não tem direito ao projeto grátis.`);
      }
    } catch (err) {
      if (err instanceof AppError) {
        console.error(`Erro de aplicação: ${err.message}`);
        throw err;
      } else {
        console.error("Erro inesperado ao resgatar recompensa:", err);
        throw new AppError("Erro inesperado ao resgatar recompensa", 500);
      }
    }
  }
}
