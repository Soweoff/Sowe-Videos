import MainController from '../control/MainController';

export function showRewardsMenu(controller: MainController) {
  const clientes = controller.listarClientesComRecompensa();
  console.log('=== Clientes com recompensas pendentes ===');
  if (!clientes || clientes.length === 0) {
    console.log('Nenhum cliente com recompensas pendentes.');
    return;
  }
  clientes.forEach((c: any) => {
    const cpf = c.getCpf();
    const name = c.getName();
    const recompensas = (c as any).recompensasPendentes ?? 0;
    console.log(`${cpf} - ${name} — Recompensas pendentes: ${recompensas}`);
  });
}

export function markRewardPaid(controller: MainController, clienteCpf: number) {
  try {
    const updated = controller.marcarRecompensaComoUsada(clienteCpf);
    if (!updated) {
      console.log('Cliente não encontrado ou nenhuma recompensa para marcar.');
      return;
    }
    console.log(`Recompensa marcada como usada: Cliente ${updated.getCpf()} — recompensas agora: ${(updated as any).recompensasPendentes}`);
  } catch (err) {
    console.error('Não foi possível marcar recompensa:', (err as Error).message);
  }
}
