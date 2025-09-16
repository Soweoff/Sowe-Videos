"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Projeto {
    name;
    preco_base;
    duracao_maxima;
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setPreco_base(preco_base) {
        this.preco_base = preco_base;
    }
    getPreco_base() {
        return this.preco_base;
    }
    setDuracao_maxima(duracao_maxima) {
        this.duracao_maxima = duracao_maxima;
    }
    getDuracao_maxima() {
        return this.duracao_maxima;
    }
}
exports.default = Projeto;
