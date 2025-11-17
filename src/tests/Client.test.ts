// tests/Client.test.ts
import Client from "../model/Client";
import Projeto from "../model/Project";

describe("Client model", () => {
  test("cliente acumula projetos e resgata recompensa a cada 5", () => {
    const client = new Client("Teste", "t@ex.com", 123456789);
    expect(client.getProjetos_comprados()).toBe(0);

    for (let i = 0; i < 5; i++) {
      client.adicionarProjetoComprado(new Projeto(i + 1, `P${i + 1}`, client, null as any, 100));
    }

    expect(client.getProjetos_comprados()).toBe(5);
    expect(client.podeResgatarRecompensa()).toBe(true);
  });
});
