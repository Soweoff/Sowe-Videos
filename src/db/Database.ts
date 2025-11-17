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
};

type ProjetoPlain = {
  id: number;
  name: string;
  clientCpf: number;
  editorName?: string | null;
  preco: number;
  ehRecompensa: boolean;
};

export default class Database implements IClientRepository {
  private clientesDB: Client[] = [];
  private projetosDB: Projeto[] = [];
  private dbFile: string;

  constructor() {
    const dataDir = path.resolve(__dirname);
    this.dbFile = path.join(dataDir, "data.json");
    this.load();
  }

  private load(): void {
    if (!fs.existsSync(this.dbFile)) {
      this.save(); // cria arquivo vazio
      return;
    }

    try {
      const raw = fs.readFileSync(this.dbFile, "utf-8");
      if (!raw) {
        this.clientesDB = [];
        this.projetosDB = [];
        return;
      }
      const parsed = JSON.parse(raw);
      const clientsPlain: ClientPlain[] = parsed.clientes || [];
      const projetosPlain: ProjetoPlain[] = parsed.projetos || [];

      // reconstruir clientes
      this.clientesDB = clientsPlain.map(cp => {
        const c = new Client(cp.name, cp.email, cp.cpf, cp.telefone);
        c.setProjetos_comprados(cp.projetos_comprados || 0);
        return c;
      });

      // reconstruir projetos (associa cliente por cpf quando possível)
      this.projetosDB = projetosPlain.map(pp => {
        const client = this.clientesDB.find(c => c.getCpf() === pp.clientCpf) || new Client("desconhecido", "unknown", pp.clientCpf);
        const editor = pp.editorName ? new Editor(pp.editorName, "editor@local", "N/A") : null;
        const p = new Projeto(pp.id, pp.name, client, editor, pp.preco);
        p.setEhRecompensa(pp.ehRecompensa || false);
        return p;
      });
    } catch (err) {
      // se falhar, garantir DB limpo
      this.clientesDB = [];
      this.projetosDB = [];
      this.save();
    }
  }

  public save(): void {
    const clientsPlain: ClientPlain[] = this.clientesDB.map(c => ({
      name: c.getName(),
      email: c.getEmail(),
      telefone: c.getTelefone(),
      cpf: c.getCpf(),
      projetos_comprados: c.getProjetos_comprados()
    }));

    const projetosPlain: ProjetoPlain[] = this.projetosDB.map(p => ({
      id: p.getId(),
      name: p.getName(),
      clientCpf: p.getClient()?.getCpf() ?? 0,
      editorName: p.getEditor()?.getName() ?? null,
      preco: p.getPreco(),
      ehRecompensa: p.getEhRecompensa()
    }));

    const dump = JSON.stringify({ clientes: clientsPlain, projetos: projetosPlain }, null, 2);
    fs.writeFileSync(this.dbFile, dump, "utf-8");
  }

  // IClientRepository implementation
  public insert(cliente: Client): void {
    this.insertNewCliente(cliente);
  }

  public insertNewCliente(cliente: Client) {
    // evitar duplicidade por cpf
    const exists = this.clientesDB.find(c => c.getCpf() === cliente.getCpf());
    if (!exists) {
      this.clientesDB.push(cliente);
      console.log(`Cliente ${cliente.getName()} inserido no banco.`);
      this.save();
    } else {
      // atualizar dados caso precise
      exists.setName(cliente.getName());
      exists.setEmail(cliente.getEmail());
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

  public getAll(): Client[] {
    return this.getAllClientes();
  }

  public getAllClientes(): Client[] {
    return this.clientesDB.slice();
  }

  public insertNewProjeto(projeto: Projeto) {
    this.projetosDB.push(projeto);
    console.log(`Projeto ${projeto.getName()} inserido no banco.`);
    this.save();
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
}
