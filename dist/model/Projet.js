"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Projeto {
    name;
    tipo_video;
    data_inicial;
    data_final;
    status;
    brinde_recebido;
    client;
    editor;
    constructor(client, editor) {
        this.client = client;
        this.editor = editor;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setTipo_video(tipo_video) {
        this.tipo_video = tipo_video;
    }
    getTipo_video() {
        return this.tipo_video;
    }
    setData_inicial(data_inicial) {
        this.data_inicial = data_inicial;
    }
    getData_inicial() {
        return this.data_inicial;
    }
    setData_final(data_final) {
        this.data_final = data_final;
    }
    getData_final() {
        return this.data_final;
    }
    setStatus(status) {
        this.status = status;
    }
    getStatus() {
        return this.status;
    }
    setBrinde_recebido(brinde_recebido) {
        this.brinde_recebido = brinde_recebido;
    }
    getBrinde_recebido() {
        return this.brinde_recebido;
    }
}
exports.default = Projeto;
