import promptSync from 'prompt-sync';
import MainController from '../control/MainController';
import CompraView from './CompraView';
import ClientView from './ClientView';
import { showRewardsMenu, markRewardPaid } from './RewardsView';


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
const input = this.prompt(
"=== Menu Principal ===\n1. Gerenciar Compras\n2. Gerenciar Clientes\n3. Recompensas\n4. Sair\nEscolha: "
);
const choice = parseInt(input);


if (isNaN(choice)) {
console.log("Entrada inválida, digite um número.");
continue;
}


switch (choice) {
case 1:
new CompraView(this.mainController);
break;
case 2:
new ClientView(this.mainController);
break;
case 3:
this.rewardsMenu();
break;
case 4:
continues = false;
console.log("Sistema encerrado.");
break;
default:
console.log("Opção inválida. Tente novamente.");
break;
}
}
}


private rewardsMenu(): void {
let running = true;
while (running) {
const option = parseInt(
this.prompt("\n=== Recompensas ===\n1. Ver Clientes com Recompensas\n2. Marcar Recompensa como Usada\n3. Voltar\nEscolha: ")
);


switch (option) {
case 1:
showRewardsMenu(this.mainController);
break;
case 2:
const cpf = parseInt(this.prompt("CPF do cliente: "));
if (isNaN(cpf)) {
console.log("CPF inválido.");
break;
}
markRewardPaid(this.mainController, cpf);
break;
case 3:
running = false;
}
}
}
}