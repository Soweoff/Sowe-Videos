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

  public processarCompra(clienteCpf: number, projectName: string, projectPrice: number): void {
    try {
      if (!clienteCpf || isNaN(clienteCpf)) throw new AppError("CPF do cliente é obrigatório e deve ser numérico", 400);
      if (!projectName || projectName.trim().length === 0) throw new AppError("Nome do projeto é obrigatório", 400);
      if (isNaN(projectPrice) || projectPrice < 0) throw new AppError("Preço do projeto inválido", 400);

      const cliente = this.database.findClienteByCpf(clienteCpf);
      if (!cliente) {
        console.log(`Cliente com CPF ${clienteCpf} não encontrado. Cadastre o cliente primeiro em 'Gerenciar Clientes'.`);
        return;
      }

      const editor = new Editor("Editor Padrão", "editor@example.com", "VFX");

      const idProjeto = this.database.getAllProjetos().length + 1;
      const newProjeto = new Projeto(idProjeto, projectName, cliente, editor, projectPrice);

      this.compraService.registrarCompra(cliente, newProjeto);

      const totalCompras = (cliente as any).totalCompras || (cliente.getProjetos_comprados ? cliente.getProjetos_comprados() : 0);
      if (totalCompras % 5 === 0 && totalCompras > 0) {
        console.log(`Cliente ${cliente.getCpf()} ganhou uma recompensa! Recompensas pendentes: ${(cliente as any).recompensasPendentes || 0}`);
      }
    } catch (err) {
      if (err instanceof AppError) {
        console.error(`Erro: ${err.message}`);
      } else {
        console.error("Erro inesperado em processarCompra:", err);
      }
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
        const totalCompras = (client as any).totalCompras ?? (client.getProjetos_comprados ? client.getProjetos_comprados() : 0);
        const recompensas = (client as any).recompensasPendentes ?? 0;
        console.log(`CPF: ${client.getCpf()}, Nome: ${client.getName()}, Email: ${client.getEmail()}, Compras: ${totalCompras}, Recompensas: ${recompensas}`);
      });
    }
  }

  public listarClientesComRecompensa(): Client[] {
    return this.database.getClientesComRecompensa();
  }

  public marcarRecompensaComoUsada(clienteCpf: number): Client | undefined {
    try {
      const clienteAtualizado = this.compraService.usarRecompensaPorCpf(clienteCpf);
      return clienteAtualizado;
    } catch (err) {
      console.error("Erro ao usar recompensa:", (err as Error).message);
      return undefined;
    }
  }

  public adicionarCategoria(nome: string): void {
    this.database.addCategory(nome);
    console.log(`Categoria "${nome}" adicionada.`);
  }

  public findClientByCpf(cpf: number): Client | undefined {
    return this.database.findClienteByCpf(cpf);
  }
}
