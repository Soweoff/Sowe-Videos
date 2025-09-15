// src/db/Database.ts

import Cliente from "../model/Client";
import Projeto from "../model/Projet";

export default class Database {

    private clientesDB: Cliente[] = [];
    private projetosDB: Projeto[] = [];

    public insertNewCliente(cliente: Cliente) {
        this.clientesDB.push(cliente);
        console.log(`Cliente ${cliente.nome} inserido no banco.`);
    }

    public insertNewProjeto(projeto: Projeto) {
        this.projetosDB.push(projeto);
        console.log(`Projeto ${projeto.nome} inserido no banco.`);
    }

    public getAllClientes(): Cliente[] {
        return this.clientesDB;
    }
    
    public getAllProjetos(): Projeto[] {
        return this.projetosDB;
    }
}