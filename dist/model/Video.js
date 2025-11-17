"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Video {
    name;
    preco_base;
    duracao_maxima;
    tipo;
    constructor(name, preco_base, duracao_maxima, tipo) {
        this.name = name;
        this.preco_base = preco_base;
        this.duracao_maxima = duracao_maxima;
        this.tipo = tipo;
    }
    // Getters e Setters
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getPrecoBase() {
        return this.preco_base;
    }
    setPrecoBase(preco_base) {
        this.preco_base = preco_base;
    }
    getDuracaoMaxima() {
        return this.duracao_maxima;
    }
    setDuracaoMaxima(duracao_maxima) {
        this.duracao_maxima = duracao_maxima;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
}
exports.default = Video;
