"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/control/MainController.ts
const Client_1 = __importDefault(require("../model/Client"));
const Projet_1 = __importDefault(require("../model/Projet"));
const CompraService_1 = __importDefault(require("../service/CompraService"));
const Database_1 = __importDefault(require("../db/Database"));
const MainScreen_1 = __importDefault(require("../view/MainScreen"));
class MainController {
    compraService;
    database;
    constructor() {
        this.database = new Database_1.default();
        this.compraService = new CompraService_1.default(this.database);
        new MainScreen_1.default(this);
    }
    processarCompra(clientName, projectName, projectPrice) {
        const idCliente = this.database.getAllClientes().length + 1;
        const idProjeto = this.database.getAllProjetos().length + 1;
        const newCliente = new Client_1.default(idCliente, clientName, `${clientName}@email.com`);
        const newProjeto = new Projet_1.default(idProjeto, projectName, parseFloat(projectPrice));
        this.database.insertNewCliente(newCliente);
        this.database.insertNewProjeto(newProjeto);
        this.compraService.registrarCompra(newCliente, newProjeto);
    }
    viewSavedProjects() {
        const projetos = this.database.getAllProjetos();
        console.log("\n--- Projetos Salvos ---");
        if (projetos.length === 0) {
            console.log("Nenhum projeto foi salvo ainda.");
        }
        else {
            projetos.forEach(proj => {
                console.log(`ID: ${proj.id}, Nome: ${proj.nome}, Preço: R$${proj.preco}`);
            });
        }
    }
    processarCadastroCliente(name, email) {
        const idCliente = this.database.getAllClientes().length + 1;
        const newClient = new Client_1.default(idCliente, name, email);
        this.database.insertNewCliente(newClient);
        console.log(`Cliente ${name} cadastrado com sucesso.`);
    }
    viewAllClients() {
        const clientes = this.database.getAllClientes();
        console.log("\n--- Clientes Cadastrados ---");
        if (clientes.length === 0) {
            console.log("Nenhum cliente foi cadastrado ainda.");
        }
        else {
            clientes.forEach(client => {
                console.log(`ID: ${client.id}, Nome: ${client.nome}, Email: ${client.email}`);
            });
        }
    }
}
exports.default = MainController;
