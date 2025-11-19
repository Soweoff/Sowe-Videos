"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Projeto {
    id;
    name;
    tipo_video = null;
    data_inicial = null;
    data_final = null;
    status = false;
    brinde_recebido = false;
    client;
    editor;
    preco = 0;
    ehRecompensa = false;
    constructor(id, name, client, editor, preco = 0) {
        this.id = id;
        this.name = name;
        this.client = client;
        this.editor = editor;
        this.preco = preco;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getTipo_video() {
        return this.tipo_video;
    }
    setTipo_video(tipo_video) {
        this.tipo_video = tipo_video;
    }
    setDatas(a, b) {
        if (b) {
            this.data_inicial = a;
            this.data_final = b;
        }
        else {
            this.data_inicial = a;
        }
    }
    getData_inicial() {
        return this.data_inicial;
    }
    setData_inicial(data_inicial) {
        this.data_inicial = data_inicial;
    }
    getData_final() {
        return this.data_final;
    }
    setData_final(data_final) {
        this.data_final = data_final;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getBrinde_recebido() {
        return this.brinde_recebido;
    }
    setBrinde_recebido(brinde_recebido) {
        this.brinde_recebido = brinde_recebido;
    }
    getClient() {
        return this.client;
    }
    getEditor() {
        return this.editor;
    }
    getPreco() {
        return this.preco;
    }
    setPreco(preco) {
        this.preco = preco;
    }
    getEhRecompensa() {
        return this.ehRecompensa;
    }
    setEhRecompensa(ehRecompensa) {
        this.ehRecompensa = ehRecompensa;
    }
}
exports.default = Projeto;
