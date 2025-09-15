// src/control/MainController.ts
import Cliente from "../model/Client";
import Projeto from "../model/Projet";
import CompraService from "../service/CompraService";
import Database from "../db/Database";
import MainScreen from "../view/MainScreen";

export default class MainController {
    public compraService: CompraService;
    public database: Database;

    constructor() {
        this.database = new Database();
        this.compraService = new CompraService(this.database);
        new MainScreen(this);
    }

    public processarCompra(clientName: string, projectName: string, projectPrice: string): void {
      const idCliente = this.database.getAllClientes().length + 1;
      const idProjeto = this.database.getAllProjetos().length + 1;

      const newCliente = new Cliente(idCliente, clientName, `${clientName}@email.com`);
      const newProjeto = new Projeto(idProjeto, projectName, parseFloat(projectPrice));
      
      this.database.insertNewCliente(newCliente);
      this.database.insertNewProjeto(newProjeto);
      
      this.compraService.registrarCompra(newCliente, newProjeto);
    }

    public viewSavedProjects(): void {
        const projetos = this.database.getAllProjetos();
        console.log("\n--- Projetos Salvos ---");
        if (projetos.length === 0) {
            console.log("Nenhum projeto foi salvo ainda.");
        } else {
            projetos.forEach(proj => {
                console.log(`ID: ${proj.id}, Nome: ${proj.nome}, Preço: R$${proj.preco}`);
            });
        }
    }
    
    
    public processarCadastroCliente(name: string, email: string): void {
        const idCliente = this.database.getAllClientes().length + 1;
        const newClient = new Cliente(idCliente, name, email);
        this.database.insertNewCliente(newClient);
        console.log(`Cliente ${name} cadastrado com sucesso.`);
    }

    public viewAllClients(): void {
        const clientes = this.database.getAllClientes();
        console.log("\n--- Clientes Cadastrados ---");
        if (clientes.length === 0) {
            console.log("Nenhum cliente foi cadastrado ainda.");
        } else {
            clientes.forEach(client => {
                console.log(`ID: ${client.id}, Nome: ${client.nome}, Email: ${client.email}`);
            });
        }
    }
}