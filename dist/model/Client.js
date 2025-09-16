"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = __importDefault(require("./Person"));
class Client extends Person_1.default {
    quant_proj_comprados;
    projetos_comprados;
    cpf;
    constructor(cpf, email) {
        super(email);
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
}
exports.default = Client;
