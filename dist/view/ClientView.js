"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/view/ClientView.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class ClientView {
    mainController;
    prompt = (0, prompt_sync_1.default)();
    constructor(mainController) {
        this.mainController = mainController;
        this.mainMenu();
    }
    mainMenu() {
        let continues = true;
        while (continues) {
            const choice = parseInt(this.prompt("--- Clientes ---\n1. Cadastrar Cliente\n2. Ver Todos os Clientes\n3. Sair\n"));
            switch (choice) {
                case 1:
                    this.registerNewClient();
                    break;
                case 2:
                    this.mainController.viewAllClients();
                    break;
                case 3:
                    continues = false;
                    break;
                default:
                    console.log("Opção inválida.");
                    break;
            }
        }
    }
    registerNewClient() {
        const name = this.prompt("Nome do cliente: ");
        const email = this.prompt("Email do cliente: ");
        // Chama o método no MainController para cadastrar o cliente
        this.mainController.processarCadastroCliente(name, email);
    }
}
exports.default = ClientView;
