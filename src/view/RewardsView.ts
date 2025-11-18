// src/view/RewardsView.ts
import MainController from '../control/MainController';

export async function showRewardsMenu(controller: MainController) {
  // garantir que o controller devolve uma lista (agora é async)
  const clientes = await controller.listarClientesComRecompensa();
  console.log('=== Clientes com recompensas pendentes ===');
  if (!clientes || clientes.length === 0) {
    console.log('Nenhum cliente com recompensas pendentes.');
    return;
  }
  clientes.forEach((c: any) => {
    // usa getters do seu Client (getCpf/getName)
    const cpf = typeof c.getCpf === 'function' ? c.getCpf() : (c as any).cpf;
    const name = typeof c.getName === 'function' ? c.getName() : (c as any).name;
    const recompensas = (c as any).recompensasPendentes ?? 0;
    console.log(`${cpf} - ${name} — Recompensas pendentes: ${recompensas}`);
  });
}

export async function markRewardPaid(controller: MainController, clienteCpf: number) {
  try {
    const updated = await controller.marcarRecompensaComoUsada(clienteCpf);
    if (!updated) {
      console.log('Cliente não encontrado ou nenhuma recompensa para marcar.');
      return;
    }
    const cpf = typeof updated.getCpf === 'function' ? updated.getCpf() : (updated as any).cpf;
    const recompensas = (updated as any).recompensasPendentes ?? 0;
    console.log(`Recompensa marcada como usada: Cliente ${cpf} — recompensas agora: ${recompensas}`);
  } catch (err) {
    console.error('Não foi possível marcar recompensa:', (err as Error).message);
  }
}
