"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRewardsMenu = showRewardsMenu;
exports.markRewardPaid = markRewardPaid;
async function showRewardsMenu(controller) {
    // garantir que o controller devolve uma lista (agora é async)
    const clientes = await controller.listarClientesComRecompensa();
    console.log('=== Clientes com recompensas pendentes ===');
    if (!clientes || clientes.length === 0) {
        console.log('Nenhum cliente com recompensas pendentes.');
        return;
    }
    clientes.forEach((c) => {
        // usa getters do seu Client (getCpf/getName)
        const cpf = typeof c.getCpf === 'function' ? c.getCpf() : c.cpf;
        const name = typeof c.getName === 'function' ? c.getName() : c.name;
        const recompensas = c.recompensasPendentes ?? 0;
        console.log(`${cpf} - ${name} — Recompensas pendentes: ${recompensas}`);
    });
}
async function markRewardPaid(controller, clienteCpf) {
    try {
        const updated = await controller.marcarRecompensaComoUsada(clienteCpf);
        if (!updated) {
            console.log('Cliente não encontrado ou nenhuma recompensa para marcar.');
            return;
        }
        const cpf = typeof updated.getCpf === 'function' ? updated.getCpf() : updated.cpf;
        const recompensas = updated.recompensasPendentes ?? 0;
        console.log(`Recompensa marcada como usada: Cliente ${cpf} — recompensas agora: ${recompensas}`);
    }
    catch (err) {
        console.error('Não foi possível marcar recompensa:', err.message);
    }
}
