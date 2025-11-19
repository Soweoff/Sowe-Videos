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
    totalCompras = 0;
    recompensasPendentes = 0;
    constructor(name, email, cpf, telefone = 0, projetos_comprados = 0, recompensasPendentes = 0) {
        super(name, email, telefone);
        this.cpf = cpf;
        this.projetos_comprados = projetos_comprados || 0;
        this.totalCompras = this.projetos_comprados;
        this.recompensasPendentes = recompensasPendentes || 0;
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
        this.totalCompras = projetos_comprados;
    }
    adicionarProjetoComprado(projeto) {
        this.projetos.push(projeto);
        this.projetos_comprados++;
        this.quant_proj_comprados++;
        this.addPurchase(false);
    }
    getProjetos() {
        return this.projetos;
    }
    podeResgatarRecompensa() {
        return (this.recompensasPendentes || 0) > 0 || (this.totalCompras > 0 && this.totalCompras % 5 === 0);
    }
    resetarContagemProjetos() {
        this.projetos_comprados = 0;
        this.totalCompras = 0;
    }
    showInfo() {
        console.log(`Cliente: ${this.getName()} | Email: ${this.getEmail()} | CPF: ${this.cpf} | Comprados: ${this.projetos_comprados} | Recompensas: ${this.recompensasPendentes}`);
    }
    addPurchase(isReward = false) {
        if (!isReward) {
            this.totalCompras = (this.totalCompras || 0) + 1;
            this.projetos_comprados = this.totalCompras;
            if (this.totalCompras % 5 === 0) {
                this.recompensasPendentes = (this.recompensasPendentes || 0) + 1;
            }
        }
    }
    useReward() {
        if ((this.recompensasPendentes || 0) > 0) {
            this.recompensasPendentes -= 1;
            return true;
        }
        return false;
    }
    getTotalCompras() {
        return this.totalCompras;
    }
    getRecompensasPendentes() {
        return this.recompensasPendentes;
    }
    toPlain() {
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
exports.default = Client;
