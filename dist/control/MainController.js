"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/control/MainController.ts
const Client_1 = __importDefault(require("../model/Client"));
const Project_1 = __importDefault(require("../model/Project"));
const Editor_1 = __importDefault(require("../model/Editor"));
const CompraService_1 = __importDefault(require("../service/CompraService"));
const Database_1 = __importDefault(require("../db/Database"));
const MainScreen_1 = __importDefault(require("../view/MainScreen"));
const AppError_1 = __importDefault(require("../errors/AppError"));
class MainController {
    compraService;
    database;
    constructor(database) {
        this.database = database || new Database_1.default();
        this.compraService = new CompraService_1.default(this.database);
        new MainScreen_1.default(this);
    }
    /**
     * Agora processarCompra espera o CPF do cliente (digitado pelo usuário).
     * Fluxo:
     *  - valida entrada
     *  - procura cliente por CPF (não cria automaticamente)
     *  - se não existir, instrui para cadastrar primeiro
     *  - cria projeto associado ao cliente e registra compra
     */
    processarCompra(clienteCpf, projectName, projectPrice) {
        try {
            if (!clienteCpf || isNaN(clienteCpf))
                throw new AppError_1.default("CPF do cliente é obrigatório e deve ser numérico", 400);
            if (!projectName || projectName.trim().length === 0)
                throw new AppError_1.default("Nome do projeto é obrigatório", 400);
            if (isNaN(projectPrice) || projectPrice < 0)
                throw new AppError_1.default("Preço do projeto inválido", 400);
            // buscar cliente existente pelo CPF - NÃO criar cliente novo aqui
            const cliente = this.database.findClienteByCpf(clienteCpf);
            if (!cliente) {
                console.log(`Cliente com CPF ${clienteCpf} não encontrado. Cadastre o cliente primeiro em 'Gerenciar Clientes'.`);
                return;
            }
            // Cria editor fictício (pode ser substituído por um real)
            const editor = new Editor_1.default("Editor Padrão", "editor@example.com", "VFX");
            // Cria projeto com ID incremental baseado no DB
            const idProjeto = this.database.getAllProjetos().length + 1;
            const newProjeto = new Project_1.default(idProjeto, projectName, cliente, editor, projectPrice);
            // Registra a compra via service (síncrono, compatível com seu teste)
            this.compraService.registrarCompra(cliente, newProjeto);
            // Notificar se ganhou recompensa (campo criado no Client durante registrarCompra)
            const totalCompras = cliente.totalCompras || (cliente.getProjetos_comprados ? cliente.getProjetos_comprados() : 0);
            if (totalCompras % 5 === 0 && totalCompras > 0) {
                console.log(`Cliente ${cliente.getCpf()} acabou de ganhar 1 recompensa! Recompensas pendentes: ${cliente.recompensasPendentes || 0}`);
            }
        }
        catch (err) {
            if (err instanceof AppError_1.default) {
                console.error(`Erro: ${err.message}`);
            }
            else {
                console.error("Erro inesperado em processarCompra:", err);
            }
        }
    }
    viewSavedProjects() {
        const projetos = this.database.getAllProjetos();
        console.log("\n--- Projetos Salvos ---");
        if (projetos.length === 0) {
            console.log("Nenhum projeto foi salvo ainda.");
        }
        else {
            projetos.forEach(proj => {
                console.log(`ID: ${proj.getId()}, Nome: ${proj.getName()}, Preço: R$${proj.getPreco()}`);
            });
        }
    }
    processarCadastroCliente(name, email, cpf) {
        try {
            const newClient = new Client_1.default(name, email, cpf);
            this.database.insertNewCliente(newClient);
            console.log(`Cliente ${name} cadastrado com sucesso.`);
        }
        catch (err) {
            console.error("Erro ao cadastrar cliente:", err);
        }
    }
    viewAllClients() {
        const clientes = this.database.getAllClientes();
        console.log("\n--- Clientes Cadastrados ---");
        if (clientes.length === 0) {
            console.log("Nenhum cliente foi cadastrado ainda.");
        }
        else {
            clientes.forEach(client => {
                const totalCompras = client.totalCompras ?? (client.getProjetos_comprados ? client.getProjetos_comprados() : 0);
                const recompensas = client.recompensasPendentes ?? 0;
                console.log(`CPF: ${client.getCpf()}, Nome: ${client.getName()}, Email: ${client.getEmail()}, Compras: ${totalCompras}, Recompensas: ${recompensas}`);
            });
        }
    }
    // --- Novas ações para recompensa e categorias (compatíveis com CPF-based workflow) ---
    // agora retorna a lista para uso por Views/Tests
    async listarClientesComRecompensa() {
        const clientes = this.database.getClientesComRecompensa();
        return clientes;
    }
    // agora retorna o cliente atualizado para uso por Views/Tests
    async marcarRecompensaComoUsada(clienteCpf) {
        try {
            const clienteAtualizado = this.compraService.usarRecompensaPorCpf(clienteCpf);
            return clienteAtualizado;
        }
        catch (err) {
            console.error("Erro ao usar recompensa:", err.message);
            return undefined;
        }
    }
    adicionarCategoria(nome) {
        this.database.addCategory(nome);
        console.log(`Categoria "${nome}" adicionada.`);
    }
}
exports.default = MainController;
