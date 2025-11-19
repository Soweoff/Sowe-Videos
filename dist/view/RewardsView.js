"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRewardsMenu = showRewardsMenu;
exports.markRewardPaid = markRewardPaid;
function showRewardsMenu(controller) {
    const clientes = controller.listarClientesComRecompensa();
    console.log('=== Clientes com recompensas pendentes ===');
    if (!clientes || clientes.length === 0) {
        console.log('Nenhum cliente com recompensas pendentes.');
        return;
    }
    clientes.forEach((c) => {
        const cpf = c.getCpf();
        const name = c.getName();
        const recompensas = c.recompensasPendentes ?? 0;
        console.log(`${cpf} - ${name} — Recompensas pendentes: ${recompensas}`);
    });
}
function markRewardPaid(controller, clienteCpf) {
    try {
        const updated = controller.marcarRecompensaComoUsada(clienteCpf);
        if (!updated) {
            console.log('Cliente não encontrado ou nenhuma recompensa para marcar.');
            return;
        }
        console.log(`Recompensa marcada como usada: Cliente ${updated.getCpf()} — recompensas agora: ${updated.recompensasPendentes}`);
    }
    catch (err) {
        console.error('Não foi possível marcar recompensa:', err.message);
    }
}
