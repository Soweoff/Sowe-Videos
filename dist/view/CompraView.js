"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/view/CompraView.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class CompraView {
    mainController;
    prompt = (0, prompt_sync_1.default)();
    constructor(mainController) {
        this.mainController = mainController;
        this.mainMenu();
    }
    mainMenu() {
        let continues = true;
        while (continues) {
            const choice = parseInt(this.prompt("Escolha\n1. Cadastrar Compra\n2. Sair\n"));
            switch (choice) {
                case 1:
                    this.registerPurchase();
                    break;
                case 2:
                    continues = false;
                    break;
                default:
                    console.log("Opção inválida.");
                    break;
            }
        }
    }
    registerPurchase() {
        const clientName = this.prompt("Digite o nome do cliente: ");
        const projectName = this.prompt("Digite o nome do projeto: ");
        const projectPrice = parseFloat(this.prompt("Digite o valor do projeto: "));
        this.mainController.processarCompra(clientName, projectName, projectPrice.toString());
    }
}
exports.default = CompraView;
