"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/model/Cliente.ts
class Cliente {
    id;
    nome;
    email;
    projetosComprados; // Nova propriedade para contar os projetos
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.projetosComprados = 0;
    }
    adicionarProjetoComprado() {
        this.projetosComprados++;
        console.log(`Cliente "${this.nome}" agora tem ${this.projetosComprados} projetos comprados.`);
    }
    podeResgatarRecompensa() {
        return this.projetosComprados >= 10;
    }
    resetarContagemProjetos() {
        this.projetosComprados = 0;
    }
}
exports.default = Cliente;
