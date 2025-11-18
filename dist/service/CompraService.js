"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompraService {
    db;
    constructor(db) {
        this.db = db;
    }
    // ------ Método compatível com seu fluxo antigo (síncrono) ------
    // assinatura usada no seu teste: registrarCompra(client, projeto)
    registrarCompra(cliente, projeto) {
        // adiciona projeto ao cliente (internamente já chama addPurchase)
        cliente.adicionarProjetoComprado(projeto);
        // salva projeto no DB (associa por cpf)
        this.db.insertNewProjeto(projeto);
        // garante cliente persistido/atualizado
        this.db.insertNewCliente(cliente);
        // registra histórico de compra
        this.db.addCompra({ clienteCpf: cliente.getCpf(), projetoId: projeto.getId(), isReward: projeto.getEhRecompensa() });
        console.log(`Compra registrada: cliente cpf=${cliente.getCpf()} projeto id=${projeto.getId()}`);
    }
    // ------ Novo método assíncrono baseado em CPF para integração com controller/chatgpt logic ------
    async registerCompraByCpf(clienteCpf, projetoId) {
        // encontrar cliente
        const cliente = this.db.findClienteByCpf(clienteCpf);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        // procurar projeto pelo id (se houver) ou criar referência mínima
        const projeto = this.db.getAllProjetos().find(p => p.getId() === projetoId);
        // se não houver projeto existente, você pode optar por criar um projeto genérico; aqui apenas registra a compra
        // registrar compra no histórico
        const compra = this.db.addCompra({ clienteCpf, projetoId, isReward: false });
        // atualizar contadores no cliente
        cliente.addPurchase(false);
        this.db.updateClientByCpf({
            cpf: cliente.getCpf(),
            projetos_comprados: cliente.getProjetos_comprados ? cliente.getProjetos_comprados() : cliente.totalCompras || 0,
            totalCompras: cliente.totalCompras || 0,
            recompensasPendentes: cliente.recompensasPendentes || 0
        });
        const ganhouRecompensa = (cliente.totalCompras % 5 === 0);
        return {
            compra,
            cliente: {
                cpf: cliente.getCpf(),
                totalCompras: cliente.totalCompras || 0,
                recompensasPendentes: cliente.recompensasPendentes || 0
            },
            ganhouRecompensa
        };
    }
    // usar recompensa por CPF
    usarRecompensaPorCpf(clienteCpf) {
        const cliente = this.db.findClienteByCpf(clienteCpf);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        const ok = cliente.useReward ? cliente.useReward() : false;
        if (!ok)
            throw new Error("Cliente não possui recompensas pendentes");
        // registrar compra do tipo reward
        this.db.addCompra({ clienteCpf, projetoId: 0, isReward: true });
        this.db.updateClientByCpf({
            cpf: cliente.getCpf(),
            recompensasPendentes: cliente.recompensasPendentes || 0
        });
        return cliente;
    }
}
exports.default = CompraService;
