"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/model/Client.ts
const Person_1 = __importDefault(require("./Person"));
/**
 * Client mesclado: mantém sua implementação (extends Person, cpf, projetos)
 * e adiciona campos/metodos para recompensas (totalCompras, recompensasPendentes).
 */
class Client extends Person_1.default {
    quant_proj_comprados = 0;
    projetos_comprados = 0;
    cpf;
    projetos = [];
    // campos novos para compatibilidade com sistema de recompensas
    totalCompras = 0;
    recompensasPendentes = 0;
    constructor(name, email, cpf, telefone = 0, projetos_comprados = 0, recompensasPendentes = 0) {
        super(name, email, telefone);
        this.cpf = cpf;
        this.projetos_comprados = projetos_comprados || 0;
        this.totalCompras = this.projetos_comprados; // sincroniza com seu campo existente
        this.recompensasPendentes = recompensasPendentes || 0;
    }
    // --- seus getters/setters existentes ---
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
        // manter sincronizado
        this.totalCompras = projetos_comprados;
    }
    adicionarProjetoComprado(projeto) {
        this.projetos.push(projeto);
        this.projetos_comprados++;
        this.quant_proj_comprados++;
        // também atualizar contador totalCompras/recompensas
        this.addPurchase(false);
    }
    getProjetos() {
        return this.projetos;
    }
    podeResgatarRecompensa() {
        return (this.recompensasPendentes || 0) > 0;
        // sua versão antiga verificava projetos_comprados % 5 === 0, mas preferimos usar recompensasPendentes
    }
    resetarContagemProjetos() {
        this.projetos_comprados = 0;
        this.totalCompras = 0;
    }
    showInfo() {
        // usa propriedades herdadas via Person (nome, email)
        // assumo que Person tem getters; seu código original às vezes acessava this.name diretamente.
        // manter um fallback simples:
        const nome = this.name ?? this.getName?.() ?? "sem-nome";
        const email = this.email ?? this.getEmail?.() ?? "sem-email";
        console.log(`Cliente: ${nome} | Email: ${email} | CPF: ${this.cpf} | Comprados: ${this.projetos_comprados} | Recompensas: ${this.recompensasPendentes}`);
    }
    // --- novos métodos para recompensas ---
    /**
     * Adiciona uma compra. Se isReward=false incrementa totalCompras e, a cada 5, adiciona 1 recompensa.
     * Se isReward=true, registra uso de recompensa (não incrementa totalCompras).
     */
    addPurchase(isReward = false) {
        if (!isReward) {
            this.totalCompras = (this.totalCompras || 0) + 1;
            // manter compatibilidade com seus campos
            this.projetos_comprados = this.totalCompras;
            // a cada 5 compras (5,10,15...), ganha 1 recompensa
            if (this.totalCompras % 5 === 0) {
                this.recompensasPendentes = (this.recompensasPendentes || 0) + 1;
            }
        }
        else {
            // compra sendo um reward: não incrementa totalCompras
        }
    }
    useReward() {
        if ((this.recompensasPendentes || 0) > 0) {
            this.recompensasPendentes -= 1;
            return true;
        }
        return false;
    }
    // serialização helper (usado pelo Database.save)
    toPlain() {
        return {
            name: this.getName ? this.getName() : this.name,
            email: this.getEmail ? this.getEmail() : this.email,
            telefone: this.getTelefone ? this.getTelefone() : 0,
            cpf: this.cpf,
            projetos_comprados: this.projetos_comprados,
            totalCompras: this.totalCompras,
            recompensasPendentes: this.recompensasPendentes
        };
    }
}
exports.default = Client;
