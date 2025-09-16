import Cliente from "../model/Client";
import Projeto from "../model/Projet";
import Database from "../db/Database";

export default class CompraService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public registrarCompra(cliente: Cliente, projeto: Projeto): void {
        if (projeto.ehRecompensa) {
            console.log(`O cliente ${cliente.nome} resgatou o projeto grátis: ${projeto.nome}`);
        } else {
            cliente.adicionarProjetoComprado();
            this.database.insertNewProjeto(projeto);
            console.log(`Projeto "${projeto.nome}" comprado por ${cliente.nome} por R$${projeto.preco}`);
        }

        if (cliente.podeResgatarRecompensa()) {
            console.log(`✅ O cliente ${cliente.nome} ganhou direito a um projeto grátis!`);
        }
    }

    public resgatarRecompensa(cliente: Cliente, nomeProjeto: string): void {
        if (cliente.podeResgatarRecompensa()) {
            const projetoGratis = new Projeto(
                this.database.getAllProjetos().length + 1,
                nomeProjeto,
                0,
                true
            );

            // Salve o projeto grátis no Database
            this.database.insertNewProjeto(projetoGratis);
            cliente.resetarContagemProjetos();
            console.log(`🎁 Projeto grátis "${projetoGratis.nome}" resgatado para ${cliente.nome}`);
        } else {
            console.log(`⚠️ O cliente ${cliente.nome} ainda não tem direito ao projeto grátis.`);
        }
    }
}