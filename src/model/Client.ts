import Person from "./Person";
import Projeto from "./Project";
import IShowInfo from "../interfaces/IShowInfo";

export default class Client extends Person implements IShowInfo {
  private quant_proj_comprados: number = 0;
  private projetos_comprados: number = 0;
  private cpf: number;
  private projetos: Projeto[] = [];

  constructor(name: string, email: string, cpf: number, telefone: number = 0) {
    super(name, email, telefone);
    this.cpf = cpf;
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
  }

  public adicionarProjetoComprado(projeto: Projeto): void {
    this.projetos.push(projeto);
    this.projetos_comprados++;
    this.quant_proj_comprados++;
  }

  public getProjetos(): Projeto[] {
    return this.projetos;
  }

  public podeResgatarRecompensa(): boolean {
    return this.projetos_comprados > 0 && this.projetos_comprados % 5 === 0;
  }

  public resetarContagemProjetos(): void {
    this.projetos_comprados = 0;
  }

  public showInfo(): void {
  console.log(`Cliente: ${this.name} | Email: ${this.email} | CPF: ${this.cpf} | Comprados: ${this.projetos_comprados}`);
}

}