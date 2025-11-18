// src/model/Client.ts
import Person from "./Person";
import Projeto from "./Project";
import IShowInfo from "../interfaces/IShowInfo";

/**
 * Client mesclado: mantém sua implementação (extends Person, cpf, projetos)
 * e adiciona campos/metodos para recompensas (totalCompras, recompensasPendentes).
 */
export default class Client extends Person implements IShowInfo {
  private quant_proj_comprados: number = 0;
  private projetos_comprados: number = 0;
  private cpf: number;
  private projetos: Projeto[] = [];

  // campos novos para compatibilidade com sistema de recompensas
  private totalCompras: number = 0;
  private recompensasPendentes: number = 0;

  constructor(name: string, email: string, cpf: number, telefone: number = 0, projetos_comprados: number = 0, recompensasPendentes: number = 0) {
    super(name, email, telefone);
    this.cpf = cpf;
    this.projetos_comprados = projetos_comprados || 0;
    this.totalCompras = this.projetos_comprados; // sincroniza com seu campo existente
    this.recompensasPendentes = recompensasPendentes || 0;
  }

  // --- seus getters/setters existentes ---
  public getCpf(): number {
    return this.cpf;
  }

  public setCpf(cpf: number): void {
    this.cpf = cpf;
  }

  public getQuant_proj_comprados(): number {
    return this.quant_proj_comprados;
  }

  public setQuant_proj_comprados(quant_proj_comprados: number): void {
    this.quant_proj_comprados = quant_proj_comprados;
  }

  public getProjetos_comprados(): number {
    return this.projetos_comprados;
  }

  public setProjetos_comprados(projetos_comprados: number): void {
    this.projetos_comprados = projetos_comprados;
    // manter sincronizado
    this.totalCompras = projetos_comprados;
  }

  public adicionarProjetoComprado(projeto: Projeto): void {
    this.projetos.push(projeto);
    this.projetos_comprados++;
    this.quant_proj_comprados++;
    // também atualizar contador totalCompras/recompensas
    this.addPurchase(false);
  }

  public getProjetos(): Projeto[] {
    return this.projetos;
  }

  public podeResgatarRecompensa(): boolean {
    return (this.recompensasPendentes || 0) > 0;
    // sua versão antiga verificava projetos_comprados % 5 === 0, mas preferimos usar recompensasPendentes
  }

  public resetarContagemProjetos(): void {
    this.projetos_comprados = 0;
    this.totalCompras = 0;
  }

  public showInfo(): void {
    // usa propriedades herdadas via Person (nome, email)
    // assumo que Person tem getters; seu código original às vezes acessava this.name diretamente.
    // manter um fallback simples:
    const nome = (this as any).name ?? this.getName?.() ?? "sem-nome";
    const email = (this as any).email ?? this.getEmail?.() ?? "sem-email";
    console.log(`Cliente: ${nome} | Email: ${email} | CPF: ${this.cpf} | Comprados: ${this.projetos_comprados} | Recompensas: ${this.recompensasPendentes}`);
  }

  // --- novos métodos para recompensas ---
  /**
   * Adiciona uma compra. Se isReward=false incrementa totalCompras e, a cada 5, adiciona 1 recompensa.
   * Se isReward=true, registra uso de recompensa (não incrementa totalCompras).
   */
  public addPurchase(isReward: boolean = false): void {
    if (!isReward) {
      this.totalCompras = (this.totalCompras || 0) + 1;
      // manter compatibilidade com seus campos
      this.projetos_comprados = this.totalCompras;
      // a cada 5 compras (5,10,15...), ganha 1 recompensa
      if (this.totalCompras % 5 === 0) {
        this.recompensasPendentes = (this.recompensasPendentes || 0) + 1;
      }
    } else {
      // compra sendo um reward: não incrementa totalCompras
    }
  }

  public useReward(): boolean {
    if ((this.recompensasPendentes || 0) > 0) {
      this.recompensasPendentes -= 1;
      return true;
    }
    return false;
  }

  // serialização helper (usado pelo Database.save)
  public toPlain() {
    return {
      name: this.getName ? this.getName() : (this as any).name,
      email: this.getEmail ? this.getEmail() : (this as any).email,
      telefone: this.getTelefone ? this.getTelefone() : 0,
      cpf: this.cpf,
      projetos_comprados: this.projetos_comprados,
      totalCompras: this.totalCompras,
      recompensasPendentes: this.recompensasPendentes
    };
  }
}
