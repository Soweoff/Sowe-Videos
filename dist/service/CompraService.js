"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../model/Project"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class CompraService {
    database;
    constructor(database) {
        this.database = database;
    }
    registrarCompra(cliente, projeto) {
        try {
            if (!cliente)
                throw new AppError_1.default("Cliente inválido", 422);
            if (!projeto)
                throw new AppError_1.default("Projeto inválido", 422);
            if (projeto.getPreco() < 0)
                throw new AppError_1.default("Preço do projeto inválido", 422);
            if (projeto.getEhRecompensa()) {
                console.log(`O cliente ${cliente.getName()} resgatou o projeto grátis: ${projeto.getName()}`);
            }
            else {
                cliente.adicionarProjetoComprado(projeto);
                // garante que cliente está no DB
                this.database.insertNewCliente(cliente);
                this.database.insertNewProjeto(projeto);
                console.log(`Projeto "${projeto.getName()}" comprado por ${cliente.getName()} por R$${projeto.getPreco()}`);
            }
            if (cliente.podeResgatarRecompensa()) {
                console.log(`✅ O cliente ${cliente.getName()} ganhou direito a um projeto grátis!`);
            }
        }
        catch (err) {
            if (err instanceof AppError_1.default) {
                console.error(`Erro de aplicação: ${err.message}`);
                throw err;
            }
            else {
                console.error("Erro inesperado ao registrar compra:", err);
                throw new AppError_1.default("Erro inesperado ao registrar compra", 500);
            }
        }
    }
    resgatarRecompensa(cliente, nomeProjeto) {
        try {
            if (!cliente)
                throw new AppError_1.default("Cliente inválido", 422);
            if (cliente.podeResgatarRecompensa()) {
                const id = this.database.getAllProjetos().length + 1;
                const projetoGratis = new Project_1.default(id, nomeProjeto, cliente, null, 0);
                projetoGratis.setEhRecompensa(true);
                this.database.insertNewProjeto(projetoGratis);
                cliente.resetarContagemProjetos();
                this.database.insertNewCliente(cliente);
                console.log(`🎁 Projeto grátis "${projetoGratis.getName()}" resgatado para ${cliente.getName()}`);
            }
            else {
                console.log(`⚠️ O cliente ${cliente.getName()} ainda não tem direito ao projeto grátis.`);
            }
        }
        catch (err) {
            if (err instanceof AppError_1.default) {
                console.error(`Erro de aplicação: ${err.message}`);
                throw err;
            }
            else {
                console.error("Erro inesperado ao resgatar recompensa:", err);
                throw new AppError_1.default("Erro inesperado ao resgatar recompensa", 500);
            }
        }
    }
}
exports.default = CompraService;
