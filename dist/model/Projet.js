"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/model/Projeto.ts
class Projeto {
    id;
    nome;
    preco;
    ehRecompensa; // Para identificar se é um projeto grátis
    constructor(id, nome, preco, ehRecompensa = false) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.ehRecompensa = ehRecompensa;
    }
}
exports.default = Projeto;
