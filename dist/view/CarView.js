"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class CarView {
    mainController;
    constructor(mainController) {
        this.mainController = mainController;
        this.mainMenu();
    }
    prompt = (0, prompt_sync_1.default)();
    mainMenu() {
        let continues = true;
        while (continues) {
            let choice = parseInt(this.prompt("Escolha\n1 Cadastrar Carro\n2 Remover Carro\n3 para sair"));
            switch (choice) {
                case 1:
                    this.carRegister();
                    break;
                case 3:
                    continues = false;
                    break;
                default:
                    console.log("digite um valor válido");
                    break;
            }
        }
    }
    carRegister() {
        let model = this.prompt("Digite o Modelo");
        let year = parseInt(this.prompt("Digite o Ano"));
        let price = parseFloat(this.prompt("Digite o Valor"));
        let newCar = this.mainController.getNewCar(model, year, price);
        //hora de guardar no banco
        this.mainController.db.insertNewCar(newCar);
        this.listAllCars();
    }
    listAllCars() {
        console.log(this.mainController.db.getAllCars());
    }
}
exports.default = CarView;
