"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class Client extends Person_1.default {
    quant_proj_comprados = 0;
    projetos_comprados = 0;
    cpf;
    projetos = [];
    constructor(name, email, cpf, telefone = 0) {
        super(name, email, telefone);
        this.cpf = cpf;
    }
    getCpf() {
        return this.cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getQuant_proj_comprados() {
        return this.quant_proj_comprados;
    }
    setQuant_proj_comprados(quant_proj_comprados) {
        this.quant_proj_comprados = quant_proj_comprados;
    }
    getProjetos_comprados() {
        return this.projetos_comprados;
    }
    setProjetos_comprados(projetos_comprados) {
        this.projetos_comprados = projetos_comprados;
    }
    adicionarProjetoComprado(projeto) {
        this.projetos.push(projeto);
        this.projetos_comprados++;
        this.quant_proj_comprados++;
    }
    getProjetos() {
        return this.projetos;
    }
    podeResgatarRecompensa() {
        return this.projetos_comprados > 0 && this.projetos_comprados % 5 === 0;
    }
    resetarContagemProjetos() {
        this.projetos_comprados = 0;
    }
    showInfo() {
        console.log(`Cliente: ${this.name} | Email: ${this.email} | CPF: ${this.cpf} | Comprados: ${this.projetos_comprados}`);
    }
}
exports.default = Client;
