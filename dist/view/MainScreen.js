"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/view/MainScreen.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const CompraView_1 = __importDefault(require("./CompraView"));
const ClientView_1 = __importDefault(require("./ClientView"));
class MainScreen {
    mainController;
    prompt = (0, prompt_sync_1.default)();
    constructor(mainController) {
        this.mainController = mainController;
        this.mainMenu();
    }
    mainMenu() {
        let continues = true;
        while (continues) {
            const input = this.prompt("=== Menu Principal ===\n1. Gerenciar Compras\n2. Gerenciar Clientes\n3. Sair\nEscolha: ");
            const choice = parseInt(input);
            if (isNaN(choice)) {
                console.log("Entrada inválida, digite um número.");
                continue;
            }
            switch (choice) {
                case 1:
                    new CompraView_1.default(this.mainController);
                    break;
                case 2:
                    new ClientView_1.default(this.mainController);
                    break;
                case 3:
                    continues = false;
                    console.log("Sistema encerrado.");
                    break;
                default:
                    console.log("Opção inválida. Tente novamente.");
                    break;
            }
        }
    }
}
exports.default = MainScreen;
