// src/view/ClientView.ts
import promptSync from 'prompt-sync';
import MainController from '../control/MainController';

export default class ClientView {
    private mainController: MainController;
    private prompt = promptSync();

    constructor(mainController: MainController) {
        this.mainController = mainController;
        this.mainMenu();
    }

    private mainMenu(): void {
        let continues: boolean = true;
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
    
    private registerNewClient(): void {
        const name: string = this.prompt("Nome do cliente: ");
        const email: string = this.prompt("Email do cliente: ");
        
        
        this.mainController.processarCadastroCliente(name, email);
    }
}