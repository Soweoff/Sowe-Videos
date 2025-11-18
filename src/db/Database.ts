// src/db/Database.ts
import fs from "fs";
import path from "path";
import Client from "../model/Client";
import Projeto from "../model/Project";
import Editor from "../model/Editor";
import IClientRepository from "../repositories/IClientRepository";

type ClientPlain = {
  name: string;
  email: string;
  telefone: number;
  cpf: number;
  projetos_comprados: number;
  totalCompras?: number;
  recompensasPendentes?: number;
};

type ProjetoPlain = {
  id: number;
  name: string;
  clientCpf: number;
  editorName?: string | null;
  preco: number;
  ehRecompensa: boolean;
};

type CompraPlain = {
  id: number;
  clienteCpf: number;
  projetoId: number;
  data: string;
  isReward: boolean;
};

type DBDump = {
  categories?: string[];
  clientes?: ClientPlain[];
  projetos?: ProjetoPlain[];
  compras?: CompraPlain[];
};

export default class Database implements IClientRepository {
  private clientesDB: Client[] = [];
  private projetosDB: Projeto[] = [];
  private comprasDB: CompraPlain[] = [];
  private categories: string[] = [];
  private dbFile: string;

  constructor() {
    const dataDir = path.resolve(__dirname);
    this.dbFile = path.join(dataDir, "data.json");
    this.load();
  }

  private load(): void {
    if (!fs.existsSync(this.dbFile)) {
      // criar arquivo com estrutura mínima
      const initial: DBDump = {
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
      fs.writeFileSync(this.dbFile, JSON.stringify(initial, null, 2), "utf-8");
    }

    try {
      const raw = fs.readFileSync(this.dbFile, "utf-8");
      if (!raw) {
        this.clientesDB = [];
        this.projetosDB = [];
        this.comprasDB = [];
        this.categories = [];
        return;
      }
      const parsed: DBDump = JSON.parse(raw);
      const clientsPlain: ClientPlain[] = parsed.clientes || [];
      const projetosPlain: ProjetoPlain[] = parsed.projetos || [];
      const comprasPlain: CompraPlain[] = parsed.compras || [];
      this.categories = parsed.categories || [];

      // reconstruir clientes
      this.clientesDB = clientsPlain.map(cp => {
        const c = new Client(cp.name, cp.email, cp.cpf, cp.telefone, cp.projetos_comprados, cp.recompensasPendentes || 0);
        return c;
      });

      // reconstruir projetos (associa cliente por cpf quando possível)
      this.projetosDB = projetosPlain.map(pp => {
        const client = this.clientesDB.find(c => c.getCpf() === pp.clientCpf) || new Client("desconhecido", "unknown", pp.clientCpf);
        const editor = pp.editorName ? new Editor(pp.editorName, "editor@local", "N/A") : null;
        const p = new Projeto(pp.id, pp.name, client, editor as any, pp.preco);
        p.setEhRecompensa(pp.ehRecompensa || false);
        return p;
      });

      // compras
      this.comprasDB = comprasPlain || [];
    } catch (err) {
      // se falhar, garantir DB limpo
      this.clientesDB = [];
      this.projetosDB = [];
      this.comprasDB = [];
      this.categories = [];
      this.save();
    }
  }

  public save(): void {
    const clientsPlain: ClientPlain[] = this.clientesDB.map(c => {
      if ((c as any).toPlain) return (c as any).toPlain();
      return {
        name: c.getName ? c.getName() : (c as any).name,
        email: c.getEmail ? c.getEmail() : (c as any).email,
        telefone: c.getTelefone ? c.getTelefone() : 0,
        cpf: c.getCpf(),
        projetos_comprados: c.getProjetos_comprados ? c.getProjetos_comprados() : 0,
        totalCompras: (c as any).totalCompras || 0,
        recompensasPendentes: (c as any).recompensasPendentes || 0
      };
    });

    const projetosPlain: ProjetoPlain[] = this.projetosDB.map(p => ({
      id: p.getId(),
      name: p.getName(),
      clientCpf: p.getClient()?.getCpf() ?? 0,
      editorName: p.getEditor()?.getName() ?? null,
      preco: p.getPreco(),
      ehRecompensa: p.getEhRecompensa()
    }));

    const dump: DBDump = {
      categories: this.categories,
      clientes: clientsPlain,
      projetos: projetosPlain,
      compras: this.comprasDB
    };

    fs.writeFileSync(this.dbFile, JSON.stringify(dump, null, 2), "utf-8");
  }

  // ---------- Category methods ----------
  public getCategories(): string[] {
    return this.categories.slice();
  }

  public addCategory(category: string): void {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
      this.save();
    }
  }

  // ---------- Client methods (CPF-based) ----------
  public insert(cliente: Client): void {
    this.insertNewCliente(cliente);
  }

  public insertNewCliente(cliente: Client) {
    const exists = this.clientesDB.find(c => c.getCpf() === cliente.getCpf());
    if (!exists) {
      this.clientesDB.push(cliente);
      this.save();
      console.log(`Cliente ${cliente.getName()} inserido no banco.`);
    } else {
      // atualizar dados caso precise
      exists.setName(cliente.getName());
      exists.setEmail(cliente.getEmail());
      exists.setQuant_proj_comprados(cliente.getQuant_proj_comprados());
      this.save();
      console.log(`Cliente ${cliente.getName()} atualizado no banco.`);
    }
  }

  public findByCpf(cpf: number): Client | undefined {
    return this.clientesDB.find(c => c.getCpf() === cpf);
  }

  public findClienteByCpf(cpf: number): Client | undefined {
    return this.findByCpf(cpf);
  }

  public getClientByCpf(cpf: number): ClientPlain | undefined {
    const c = this.findByCpf(cpf);
    if (!c) return undefined;
    return {
      name: c.getName ? c.getName() : (c as any).name,
      email: c.getEmail ? c.getEmail() : (c as any).email,
      telefone: c.getTelefone ? c.getTelefone() : 0,
      cpf: c.getCpf(),
      projetos_comprados: c.getProjetos_comprados ? c.getProjetos_comprados() : 0,
      totalCompras: (c as any).totalCompras || 0,
      recompensasPendentes: (c as any).recompensasPendentes || 0
    };
  }

  public updateClientByCpf(updated: Partial<ClientPlain> & { cpf: number }): void {
    const idx = this.clientesDB.findIndex(c => c.getCpf() === updated.cpf);
    if (idx >= 0) {
      const c = this.clientesDB[idx];
      // segurança: checar se c existe mesmo (TS)
      if (!c) {
        // nada a atualizar, garantia de segurança
        return;
      }
      if (typeof updated.name === "string") c.setName(updated.name);
      if (typeof updated.email === "string") c.setEmail(updated.email);
      if (typeof updated.telefone === "number") c.setTelefone(updated.telefone);
      if (typeof updated.projetos_comprados === "number") c.setProjetos_comprados(updated.projetos_comprados);
      // sincronizar totalCompras/recompensasPendentes se fornecidos
      if (typeof (updated as any).totalCompras === "number") (c as any).totalCompras = (updated as any).totalCompras;
      if (typeof (updated as any).recompensasPendentes === "number") (c as any).recompensasPendentes = (updated as any).recompensasPendentes;
      this.save();
    } else {
      // se não existe, inserir
      const novo = new Client(updated.name || "sem-nome", updated.email || "sem-email", updated.cpf, updated.telefone || 0, updated.projetos_comprados || 0, (updated as any).recompensasPendentes || 0);
      this.insertNewCliente(novo);
    }
  }

  public getAll(): Client[] {
    return this.getAllClientes();
  }

  public getAllClientes(): Client[] {
    return this.clientesDB.slice();
  }

  // ---------- Projeto methods ----------
  public insertNewProjeto(projeto: Projeto) {
    this.projetosDB.push(projeto);
    this.save();
    console.log(`Projeto ${projeto.getName()} inserido no banco.`);
  }

  public getAllProjetos(): Projeto[] {
    return this.projetosDB.slice();
  }

  // busca por nome
  public buscarClientesPorNome(nome: string): Client[] {
    return this.clientesDB.filter(c => c.getName().toLowerCase().includes(nome.toLowerCase()));
  }

  // ordenação por preco
  public getProjetosSortedByPreco(desc = false) {
    return this.projetosDB.slice().sort((a: Projeto, b: Projeto) => (desc ? b.getPreco() - a.getPreco() : a.getPreco() - b.getPreco()));
  }

  // ---------- Compras / Recompensas ----------
  public addCompra(compra: { clienteCpf: number; projetoId: number; data?: string; isReward?: boolean }): CompraPlain {
    const newId = this.comprasDB.length ? Math.max(...this.comprasDB.map(c => c.id)) + 1 : 1;
    const record: CompraPlain = {
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

  public getClientesComRecompensa(): Client[] {
    return this.clientesDB.filter(c => ((c as any).recompensasPendentes || 0) > 0);
  }

  public markRewardUsedByCpf(clienteCpf: number): Client {
    const cliente = this.findByCpf(clienteCpf);
    if (!cliente) throw new Error("Cliente não encontrado");
    if (((cliente as any).recompensasPendentes || 0) <= 0) throw new Error("Nenhuma recompensa pendente");
    // decrementar
    (cliente as any).recompensasPendentes -= 1;
    // adicionar compra do tipo reward ao histórico
    this.addCompra({ clienteCpf, projetoId: 0, data: new Date().toISOString(), isReward: true });
    this.save();
    return cliente;
  }
}
