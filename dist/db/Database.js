"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db/Database.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Client_1 = __importDefault(require("../model/Client"));
const Project_1 = __importDefault(require("../model/Project"));
const Editor_1 = __importDefault(require("../model/Editor"));
class Database {
    clientesDB = [];
    projetosDB = [];
    dbFile;
    constructor() {
        const dataDir = path_1.default.resolve(__dirname);
        this.dbFile = path_1.default.join(dataDir, "data.json");
        this.load();
    }
    load() {
        if (!fs_1.default.existsSync(this.dbFile)) {
            this.save(); // cria arquivo vazio
            return;
        }
        try {
            const raw = fs_1.default.readFileSync(this.dbFile, "utf-8");
            if (!raw) {
                this.clientesDB = [];
                this.projetosDB = [];
                return;
            }
            const parsed = JSON.parse(raw);
            const clientsPlain = parsed.clientes || [];
            const projetosPlain = parsed.projetos || [];
            // reconstruir clientes
            this.clientesDB = clientsPlain.map(cp => {
                const c = new Client_1.default(cp.name, cp.email, cp.cpf, cp.telefone);
                c.setProjetos_comprados(cp.projetos_comprados || 0);
                return c;
            });
            // reconstruir projetos (associa cliente por cpf quando possível)
            this.projetosDB = projetosPlain.map(pp => {
                const client = this.clientesDB.find(c => c.getCpf() === pp.clientCpf) || new Client_1.default("desconhecido", "unknown", pp.clientCpf);
                const editor = pp.editorName ? new Editor_1.default(pp.editorName, "editor@local", "N/A") : null;
                const p = new Project_1.default(pp.id, pp.name, client, editor, pp.preco);
                p.setEhRecompensa(pp.ehRecompensa || false);
                return p;
            });
        }
        catch (err) {
            // se falhar, garantir DB limpo
            this.clientesDB = [];
            this.projetosDB = [];
            this.save();
        }
    }
    save() {
        const clientsPlain = this.clientesDB.map(c => ({
            name: c.getName(),
            email: c.getEmail(),
            telefone: c.getTelefone(),
            cpf: c.getCpf(),
            projetos_comprados: c.getProjetos_comprados()
        }));
        const projetosPlain = this.projetosDB.map(p => ({
            id: p.getId(),
            name: p.getName(),
            clientCpf: p.getClient()?.getCpf() ?? 0,
            editorName: p.getEditor()?.getName() ?? null,
            preco: p.getPreco(),
            ehRecompensa: p.getEhRecompensa()
        }));
        const dump = JSON.stringify({ clientes: clientsPlain, projetos: projetosPlain }, null, 2);
        fs_1.default.writeFileSync(this.dbFile, dump, "utf-8");
    }
    // IClientRepository implementation
    insert(cliente) {
        this.insertNewCliente(cliente);
    }
    insertNewCliente(cliente) {
        // evitar duplicidade por cpf
        const exists = this.clientesDB.find(c => c.getCpf() === cliente.getCpf());
        if (!exists) {
            this.clientesDB.push(cliente);
            console.log(`Cliente ${cliente.getName()} inserido no banco.`);
            this.save();
        }
        else {
            // atualizar dados caso precise
            exists.setName(cliente.getName());
            exists.setEmail(cliente.getEmail());
            this.save();
            console.log(`Cliente ${cliente.getName()} atualizado no banco.`);
        }
    }
    findByCpf(cpf) {
        return this.clientesDB.find(c => c.getCpf() === cpf);
    }
    findClienteByCpf(cpf) {
        return this.findByCpf(cpf);
    }
    getAll() {
        return this.getAllClientes();
    }
    getAllClientes() {
        return this.clientesDB.slice();
    }
    insertNewProjeto(projeto) {
        this.projetosDB.push(projeto);
        console.log(`Projeto ${projeto.getName()} inserido no banco.`);
        this.save();
    }
    getAllProjetos() {
        return this.projetosDB.slice();
    }
    // busca por nome
    buscarClientesPorNome(nome) {
        return this.clientesDB.filter(c => c.getName().toLowerCase().includes(nome.toLowerCase()));
    }
    // ordenação por preco
    getProjetosSortedByPreco(desc = false) {
        return this.projetosDB.slice().sort((a, b) => (desc ? b.getPreco() - a.getPreco() : a.getPreco() - b.getPreco()));
    }
}
exports.default = Database;
