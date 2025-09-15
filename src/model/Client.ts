// src/model/Cliente.ts
export default class Cliente {
  id: number;
  nome: string;
  email: string;
  projetosComprados: number;

  constructor(id: number, nome: string, email: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.projetosComprados = 0; 
  }


  public adicionarProjetoComprado(): void {
    this.projetosComprados++;
    console.log(`Cliente "${this.nome}" agora tem ${this.projetosComprados} projetos comprados.`);
  }

  public podeResgatarRecompensa(): boolean {
    return this.projetosComprados >= 10;
  }
  

  public resetarContagemProjetos(): void {
    this.projetosComprados = 0;
  }
}