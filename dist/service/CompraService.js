"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CompraService {
    db;
    constructor(db) {
        this.db = db;
    }
    registrarCompra(cliente, projeto) {
        cliente.adicionarProjetoComprado(projeto);
        this.db.insertNewProjeto(projeto);
        this.db.insertNewCliente(cliente);
        this.db.addCompra({ clienteCpf: cliente.getCpf(), projetoId: projeto.getId(), isReward: projeto.getEhRecompensa() });
    }
    async registerCompraByCpf(clienteCpf, projetoId) {
        const cliente = this.db.findClienteByCpf(clienteCpf);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        const projeto = this.db.getAllProjetos().find(p => p.getId() === projetoId);
        const compra = this.db.addCompra({ clienteCpf, projetoId, isReward: false });
        cliente.addPurchase(false);
        this.db.updateClientByCpf({
            cpf: cliente.getCpf(),
            projetos_comprados: cliente.getProjetos_comprados ? cliente.getProjetos_comprados() : cliente.totalCompras || 0,
            totalCompras: cliente.totalCompras || 0,
            recompensasPendentes: cliente.recompensasPendentes || 0
        });
        const ganhouRecompensa = (cliente.totalCompras % 5 === 0);
        return { compra, cliente: { cpf: cliente.getCpf(), totalCompras: cliente.totalCompras || 0, recompensasPendentes: cliente.recompensasPendentes || 0 }, ganhouRecompensa };
    }
    usarRecompensaPorCpf(clienteCpf) {
        const cliente = this.db.findClienteByCpf(clienteCpf);
        if (!cliente)
            throw new Error("Cliente não encontrado");
        const ok = cliente.useReward ? cliente.useReward() : false;
        if (!ok)
            throw new Error("Cliente não possui recompensas pendentes");
        this.db.addCompra({ clienteCpf, projetoId: 0, isReward: true });
        this.db.updateClientByCpf({ cpf: cliente.getCpf(), recompensasPendentes: cliente.recompensasPendentes || 0 });
        return cliente;
    }
}
exports.default = CompraService;
