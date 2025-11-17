"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/control/MainController.ts
const Client_1 = __importDefault(require("../model/Client"));
const Project_1 = __importDefault(require("../model/Project"));
const Editor_1 = __importDefault(require("../model/Editor"));
const CompraService_1 = __importDefault(require("../service/CompraService"));
const Database_1 = __importDefault(require("../db/Database"));
const MainScreen_1 = __importDefault(require("../view/MainScreen"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class MainController {
    compraService;
    database;
    constructor(database) {
        this.database = database || new Database_1.default();
        this.compraService = new CompraService_1.default(this.database);
        new MainScreen_1.default(this);
    }
    processarCompra(clientName, projectName, projectPrice) {
        try {
            // Validações simples
            if (!clientName || clientName.trim().length === 0)
                throw new AppError_1.default("Nome do cliente é obrigatório", 400);
            if (!projectName || projectName.trim().length === 0)
                throw new AppError_1.default("Nome do projeto é obrigatório", 400);
            if (isNaN(projectPrice) || projectPrice < 0)
                throw new AppError_1.default("Preço do projeto inválido", 400);
            // Gerar CPF fictício (ou buscar por CPF real em uma UI mais avançada)
            const cpf = Math.floor(Math.random() * 10000000000);
            // cria cliente e adiciona ao banco (se já existe, DB cuida da atualização)
            const newCliente = new Client_1.default(clientName, `${clientName}@email.com`, cpf);
            this.database.insertNewCliente(newCliente);
            // Cria editor fictício (pode ser substituído por um real)
            const editor = new Editor_1.default("Editor Padrão", "editor@example.com", "VFX");
            // Cria projeto
            const idProjeto = this.database.getAllProjetos().length + 1;
            const newProjeto = new Project_1.default(idProjeto, projectName, newCliente, editor, projectPrice);
            // Registra a compra via service (comtraterror)
            this.compraService.registrarCompra(newCliente, newProjeto);
        }
        catch (err) {
            if (err instanceof AppError_1.default) {
                console.error(`Erro: ${err.message}`);
            }
            else {
                console.error("Erro inesperado em processarCompra:", err);
            }
        }
    }
    viewSavedProjects() {
        const projetos = this.database.getAllProjetos();
        console.log("\n--- Projetos Salvos ---");
        if (projetos.length === 0) {
            console.log("Nenhum projeto foi salvo ainda.");
        }
        else {
            projetos.forEach(proj => {
                console.log(`ID: ${proj.getId()}, Nome: ${proj.getName()}, Preço: R$${proj.getPreco()}`);
            });
        }
    }
    processarCadastroCliente(name, email, cpf) {
        try {
            const newClient = new Client_1.default(name, email, cpf);
            this.database.insertNewCliente(newClient);
            console.log(`Cliente ${name} cadastrado com sucesso.`);
        }
        catch (err) {
            console.error("Erro ao cadastrar cliente:", err);
        }
    }
    viewAllClients() {
        const clientes = this.database.getAllClientes();
        console.log("\n--- Clientes Cadastrados ---");
        if (clientes.length === 0) {
            console.log("Nenhum cliente foi cadastrado ainda.");
        }
        else {
            clientes.forEach(client => {
                console.log(`CPF: ${client.getCpf()}, Nome: ${client.getName()}, Email: ${client.getEmail()}`);
            });
        }
    }
}
exports.default = MainController;
