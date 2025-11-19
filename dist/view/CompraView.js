"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            const input = this.prompt("Escolha\n1. Cadastrar Compra\n2. Sair\nEscolha: ");
            const choice = parseInt(input);
            if (isNaN(choice)) {
                console.log("Entrada inválida, digite um número.");
                continue;
            }
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
        const cpfInput = this.prompt("CPF do cliente (somente números): ");
        const clienteCpf = parseInt(cpfInput);
        if (isNaN(clienteCpf)) {
            console.log("CPF inválido. Operação cancelada.");
            return;
        }
        const client = this.mainController.findClientByCpf(clienteCpf);
        if (!client) {
            console.log("\n Cliente não encontrado. Cadastre o cliente em Gerenciar Clientes.\n");
            return;
        }
        const projectName = this.prompt("Digite o nome do projeto: ");
        const projectPriceInput = this.prompt("Digite o valor do projeto: ");
        const projectPrice = parseFloat(projectPriceInput);
        if (isNaN(projectPrice)) {
            console.log("Valor do projeto inválido. Operação cancelada.");
            return;
        }
        this.mainController.processarCompra(clienteCpf, projectName, projectPrice);
    }
}
exports.default = CompraView;
