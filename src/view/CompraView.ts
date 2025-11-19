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

  public registerPurchase(): void {
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

    const projectName: string = this.prompt("Digite o nome do projeto: ");
    const projectPriceInput: string = this.prompt("Digite o valor do projeto: ");
    const projectPrice: number = parseFloat(projectPriceInput);

    if (isNaN(projectPrice)) {
      console.log("Valor do projeto inválido. Operação cancelada.");
      return;
    }

    this.mainController.processarCompra(clienteCpf, projectName, projectPrice);
  }
}
