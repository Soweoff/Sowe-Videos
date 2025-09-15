"use strict";
// src/db/Database.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    clientesDB = [];
    projetosDB = [];
    insertNewCliente(cliente) {
        this.clientesDB.push(cliente);
        console.log(`Cliente ${cliente.nome} inserido no banco.`);
    }
    insertNewProjeto(projeto) {
        this.projetosDB.push(projeto);
        console.log(`Projeto ${projeto.nome} inserido no banco.`);
    }
    getAllClientes() {
        return this.clientesDB;
    }
    getAllProjetos() {
        return this.projetosDB;
    }
}
exports.default = Database;
