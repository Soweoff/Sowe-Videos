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
    comprasDB = [];
    categories = [];
    dbFile;
    constructor() {
        const dataDir = path_1.default.resolve(__dirname);
        this.dbFile = path_1.default.join(dataDir, "data.json");
        this.load();
    }
    load() {
        if (!fs_1.default.existsSync(this.dbFile)) {
            // criar arquivo com estrutura mínima
            const initial = {
                categories: [
                    "Edição Simples",
                    "Trailers",
                    "Motion Graphics",
                    "Legendagem",
                    "Reels / Shorts"
                ],
                clientes: [],
                projetos: [],
                compras: []
            };
            fs_1.default.writeFileSync(this.dbFile, JSON.stringify(initial, null, 2), "utf-8");
        }
        try {
            const raw = fs_1.default.readFileSync(this.dbFile, "utf-8");
            if (!raw) {
                this.clientesDB = [];
                this.projetosDB = [];
                this.comprasDB = [];
                this.categories = [];
                return;
            }
            const parsed = JSON.parse(raw);
            const clientsPlain = parsed.clientes || [];
            const projetosPlain = parsed.projetos || [];
            const comprasPlain = parsed.compras || [];
            this.categories = parsed.categories || [];
            // reconstruir clientes
            this.clientesDB = clientsPlain.map(cp => {
                const c = new Client_1.default(cp.name, cp.email, cp.cpf, cp.telefone, cp.projetos_comprados, cp.recompensasPendentes || 0);
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
            // compras
            this.comprasDB = comprasPlain || [];
        }
        catch (err) {
            // se falhar, garantir DB limpo
            this.clientesDB = [];
            this.projetosDB = [];
            this.comprasDB = [];
            this.categories = [];
            this.save();
        }
    }
    save() {
        const clientsPlain = this.clientesDB.map(c => {
            if (c.toPlain)
                return c.toPlain();
            return {
                name: c.getName ? c.getName() : c.name,
                email: c.getEmail ? c.getEmail() : c.email,
                telefone: c.getTelefone ? c.getTelefone() : 0,
                cpf: c.getCpf(),
                projetos_comprados: c.getProjetos_comprados ? c.getProjetos_comprados() : 0,
                totalCompras: c.totalCompras || 0,
                recompensasPendentes: c.recompensasPendentes || 0
            };
        });
        const projetosPlain = this.projetosDB.map(p => ({
            id: p.getId(),
            name: p.getName(),
            clientCpf: p.getClient()?.getCpf() ?? 0,
            editorName: p.getEditor()?.getName() ?? null,
            preco: p.getPreco(),
            ehRecompensa: p.getEhRecompensa()
        }));
        const dump = {
            categories: this.categories,
            clientes: clientsPlain,
            projetos: projetosPlain,
            compras: this.comprasDB
        };
        fs_1.default.writeFileSync(this.dbFile, JSON.stringify(dump, null, 2), "utf-8");
    }
    // ---------- Category methods ----------
    getCategories() {
        return this.categories.slice();
    }
    addCategory(category) {
        if (!this.categories.includes(category)) {
            this.categories.push(category);
            this.save();
        }
    }
    // ---------- Client methods (CPF-based) ----------
    insert(cliente) {
        this.insertNewCliente(cliente);
    }
    insertNewCliente(cliente) {
        const exists = this.clientesDB.find(c => c.getCpf() === cliente.getCpf());
        if (!exists) {
            this.clientesDB.push(cliente);
            this.save();
            console.log(`Cliente ${cliente.getName()} inserido no banco.`);
        }
        else {
            // atualizar dados caso precise
            exists.setName(cliente.getName());
            exists.setEmail(cliente.getEmail());
            exists.setQuant_proj_comprados(cliente.getQuant_proj_comprados());
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
    getClientByCpf(cpf) {
        const c = this.findByCpf(cpf);
        if (!c)
            return undefined;
        return {
            name: c.getName ? c.getName() : c.name,
            email: c.getEmail ? c.getEmail() : c.email,
            telefone: c.getTelefone ? c.getTelefone() : 0,
            cpf: c.getCpf(),
            projetos_comprados: c.getProjetos_comprados ? c.getProjetos_comprados() : 0,
            totalCompras: c.totalCompras || 0,
            recompensasPendentes: c.recompensasPendentes || 0
        };
    }
    updateClientByCpf(updated) {
        const idx = this.clientesDB.findIndex(c => c.getCpf() === updated.cpf);
        if (idx >= 0) {
            const c = this.clientesDB[idx];
            // segurança: checar se c existe mesmo (TS)
            if (!c) {
                // nada a atualizar, garantia de segurança
                return;
            }
            if (typeof updated.name === "string")
                c.setName(updated.name);
            if (typeof updated.email === "string")
                c.setEmail(updated.email);
            if (typeof updated.telefone === "number")
                c.setTelefone(updated.telefone);
            if (typeof updated.projetos_comprados === "number")
                c.setProjetos_comprados(updated.projetos_comprados);
            // sincronizar totalCompras/recompensasPendentes se fornecidos
            if (typeof updated.totalCompras === "number")
                c.totalCompras = updated.totalCompras;
            if (typeof updated.recompensasPendentes === "number")
                c.recompensasPendentes = updated.recompensasPendentes;
            this.save();
        }
        else {
            // se não existe, inserir
            const novo = new Client_1.default(updated.name || "sem-nome", updated.email || "sem-email", updated.cpf, updated.telefone || 0, updated.projetos_comprados || 0, updated.recompensasPendentes || 0);
            this.insertNewCliente(novo);
        }
    }
    getAll() {
        return this.getAllClientes();
    }
    getAllClientes() {
        return this.clientesDB.slice();
    }
    // ---------- Projeto methods ----------
    insertNewProjeto(projeto) {
        this.projetosDB.push(projeto);
        this.save();
        console.log(`Projeto ${projeto.getName()} inserido no banco.`);
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
    // ---------- Compras / Recompensas ----------
    addCompra(compra) {
        const newId = this.comprasDB.length ? Math.max(...this.comprasDB.map(c => c.id)) + 1 : 1;
        const record = {
            id: newId,
            clienteCpf: compra.clienteCpf,
            projetoId: compra.projetoId,
            data: compra.data || new Date().toISOString(),
            isReward: !!compra.isReward
        };
        this.comprasDB.push(record);
        this.save();
        return record;
    }
    getClientesComRecompensa() {
        return this.clientesDB.filter(c => (c.recompensasPendentes || 0) > 0);
    }
    markRewardUsedByCpf(clienteCpf) {
        const cliente = this.findByCpf(clienteCpf);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        if ((cliente.recompensasPendentes || 0) <= 0)
            throw new Error("Nenhuma recompensa pendente");
        // decrementar
        cliente.recompensasPendentes -= 1;
        // adicionar compra do tipo reward ao histórico
        this.addCompra({ clienteCpf, projetoId: 0, data: new Date().toISOString(), isReward: true });
        this.save();
        return cliente;
    }
}
exports.default = Database;
