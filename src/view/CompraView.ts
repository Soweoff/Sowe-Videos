// src/view/CompraView.ts
import promptSync from 'prompt-sync';
import MainController from '../control/MainController';

export default class CompraView {

    private mainController: MainController;
    private prompt = promptSync();

    constructor(mainController: MainController) {
        this.mainController = mainController;
        this.mainMenu();
    }

    public mainMenu(): void {
        let continues: boolean = true;
        while(continues){
            const choice = parseInt(this.prompt("Escolha\n1. Cadastrar Compra\n2. Sair\n"));
            switch(choice){
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
    
    public registerPurchase(): void {
        const clientName: string = this.prompt("Digite o nome do cliente: ");
        const projectName: string = this.prompt("Digite o nome do projeto: ");
        const projectPrice: number = parseFloat(this.prompt("Digite o valor do projeto: "));

        this.mainController.processarCompra(clientName, projectName, projectPrice.toString());
    }
}