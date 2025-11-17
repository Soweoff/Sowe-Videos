// src/control/MainController.ts
import Client from "../model/Client";
import Projeto from "../model/Project";
import Editor from "../model/Editor";
import CompraService from "../service/CompraService";
import Database from "../db/Database";
import MainScreen from "../view/MainScreen";
import AppError from "../errors/AppError";

export default class MainController {
  public compraService: CompraService;
  public database: Database;

  constructor(database?: Database) {
    this.database = database || new Database();
    this.compraService = new CompraService(this.database);
    new MainScreen(this);
  }

  public processarCompra(clientName: string, projectName: string, projectPrice: number): void {
    try {
      // Validações simples
      if (!clientName || clientName.trim().length === 0) throw new AppError("Nome do cliente é obrigatório", 400);
      if (!projectName || projectName.trim().length === 0) throw new AppError("Nome do projeto é obrigatório", 400);
      if (isNaN(projectPrice) || projectPrice < 0) throw new AppError("Preço do projeto inválido", 400);

      // Gerar CPF fictício (ou buscar por CPF real em uma UI mais avançada)
      const cpf = Math.floor(Math.random() * 10000000000);

      // cria cliente e adiciona ao banco (se já existe, DB cuida da atualização)
      const newCliente = new Client(clientName, `${clientName}@email.com`, cpf);
      this.database.insertNewCliente(newCliente);

      // Cria editor fictício (pode ser substituído por um real)
      const editor = new Editor("Editor Padrão", "editor@example.com", "VFX");

      // Cria projeto
      const idProjeto = this.database.getAllProjetos().length + 1;
      const newProjeto = new Projeto(idProjeto, projectName, newCliente, editor, projectPrice);

      // Registra a compra via service (comtraterror)
      this.compraService.registrarCompra(newCliente, newProjeto);
    } catch (err) {
      if (err instanceof AppError) {
        console.error(`Erro: ${err.message}`);
      } else {
        console.error("Erro inesperado em processarCompra:", err);
      }
    }
  }

  public viewSavedProjects(): void {
    const projetos = this.database.getAllProjetos();
    console.log("\n--- Projetos Salvos ---");
    if (projetos.length === 0) {
      console.log("Nenhum projeto foi salvo ainda.");
    } else {
      projetos.forEach(proj => {
        console.log(`ID: ${proj.getId()}, Nome: ${proj.getName()}, Preço: R$${proj.getPreco()}`);
      });
    }
  }

  public processarCadastroCliente(name: string, email: string, cpf: number): void {
    try {
      const newClient = new Client(name, email, cpf);
      this.database.insertNewCliente(newClient);
      console.log(`Cliente ${name} cadastrado com sucesso.`);
    } catch (err) {
      console.error("Erro ao cadastrar cliente:", err);
    }
  }

  public viewAllClients(): void {
    const clientes = this.database.getAllClientes();
    console.log("\n--- Clientes Cadastrados ---");
    if (clientes.length === 0) {
      console.log("Nenhum cliente foi cadastrado ainda.");
    } else {
      clientes.forEach(client => {
        console.log(`CPF: ${client.getCpf()}, Nome: ${client.getName()}, Email: ${client.getEmail()}`);
      });
    }
  }
}
