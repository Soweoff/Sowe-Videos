// src/view/MainScreen.ts
import promptSync from 'prompt-sync';
import MainController from '../control/MainController';
import CompraView from './CompraView';
import ClientView from './ClientView';

export default class MainScreen {

    private mainController: MainController;
    private prompt = promptSync();

    constructor(mainController: MainController) {
        this.mainController = mainController;
        this.mainMenu();
    }
 private mainMenu(): void {
        let continues: boolean = true;
        while (continues) {
            const choice = parseInt(this.prompt("Escolha\n1. Gerenciar Compras\n2. Gerenciar Clientes\n3. Sair\n"));
            switch (choice) {
                case 1:
                    new CompraView(this.mainController);
                    break;
                case 2:
                    new ClientView(this.mainController);
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