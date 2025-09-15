"use strict";
// src/service/CompraService.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Projet_1 = __importDefault(require("../model/Projet"));
class CompraService {
    database; // Adicione uma referência ao Database
    constructor(database) {
        this.database = database;
    }
    registrarCompra(cliente, projeto) {
        if (projeto.ehRecompensa) {
            console.log(`O cliente ${cliente.nome} resgatou o projeto grátis: ${projeto.nome}`);
        }
        else {
            cliente.adicionarProjetoComprado();
            // Salve o projeto no Database em vez de um array local
            this.database.insertNewProjeto(projeto);
            console.log(`Projeto "${projeto.nome}" comprado por ${cliente.nome} por R$${projeto.preco}`);
        }
        if (cliente.podeResgatarRecompensa()) {
            console.log(`✅ O cliente ${cliente.nome} ganhou direito a um projeto grátis!`);
        }
    }
    resgatarRecompensa(cliente, nomeProjeto) {
        if (cliente.podeResgatarRecompensa()) {
            const projetoGratis = new Projet_1.default(this.database.getAllProjetos().length + 1, // Use a contagem do banco de dados
            nomeProjeto, 0, true);
            // Salve o projeto grátis no Database
            this.database.insertNewProjeto(projetoGratis);
            cliente.resetarContagemProjetos();
            console.log(`🎁 Projeto grátis "${projetoGratis.nome}" resgatado para ${cliente.nome}`);
        }
        else {
            console.log(`⚠️ O cliente ${cliente.nome} ainda não tem direito ao projeto grátis.`);
        }
    }
}
exports.default = CompraService;
