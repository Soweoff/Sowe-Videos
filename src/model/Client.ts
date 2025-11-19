import Person from "./Person";
import Projeto from "./Project";
import IShowInfo from "../interfaces/IShowInfo";

export default class Client extends Person implements IShowInfo {
  private quant_proj_comprados: number = 0;
  private projetos_comprados: number = 0;
  private cpf: number;
  private projetos: Projeto[] = [];

  public totalCompras: number = 0;
  public recompensasPendentes: number = 0;

  constructor(
    name: string,
    email: string,
    cpf: number,
    telefone: number = 0,
    projetos_comprados: number = 0,
    recompensasPendentes: number = 0
  ) {
    super(name, email, telefone);
    this.cpf = cpf;
    this.projetos_comprados = projetos_comprados || 0;
    this.totalCompras = this.projetos_comprados;
    this.recompensasPendentes = recompensasPendentes || 0;
  }

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
    this.totalCompras = projetos_comprados;
  }

  public adicionarProjetoComprado(projeto: Projeto): void {
    this.projetos.push(projeto);
    this.projetos_comprados++;
    this.quant_proj_comprados++;
    this.addPurchase(false);
  }

  public getProjetos(): Projeto[] {
    return this.projetos;
  }

  public podeResgatarRecompensa(): boolean {
    return (this.recompensasPendentes || 0) > 0 || (this.totalCompras > 0 && this.totalCompras % 5 === 0);
  }

  public resetarContagemProjetos(): void {
    this.projetos_comprados = 0;
    this.totalCompras = 0;
  }

  public showInfo(): void {
    console.log(
      `Cliente: ${this.getName()} | Email: ${this.getEmail()} | CPF: ${this.cpf} | Comprados: ${this.projetos_comprados} | Recompensas: ${this.recompensasPendentes}`
    );
  }

  public addPurchase(isReward: boolean = false): void {
    if (!isReward) {
      this.totalCompras = (this.totalCompras || 0) + 1;
      this.projetos_comprados = this.totalCompras;
      if (this.totalCompras % 5 === 0) {
        this.recompensasPendentes = (this.recompensasPendentes || 0) + 1;
      }
    }
  }

  public useReward(): boolean {
    if ((this.recompensasPendentes || 0) > 0) {
      this.recompensasPendentes -= 1;
      return true;
    }
    return false;
  }

  public getTotalCompras(): number {
    return this.totalCompras;
  }
  public getRecompensasPendentes(): number {
    return this.recompensasPendentes;
  }

  public toPlain() {
    return {
      name: this.getName(),
      email: this.getEmail(),
      telefone: this.getTelefone(),
      cpf: this.cpf,
      projetos_comprados: this.projetos_comprados,
      totalCompras: this.totalCompras,
      recompensasPendentes: this.recompensasPendentes
    };
  }
}
