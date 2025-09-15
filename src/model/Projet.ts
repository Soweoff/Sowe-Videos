// src/model/Projeto.ts
export default class Projeto {
  id: number;
  nome: string;
  preco: number;
  ehRecompensa: boolean; 

  constructor(id: number, nome: string, preco: number, ehRecompensa: boolean = false) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.ehRecompensa = ehRecompensa;
  }
}