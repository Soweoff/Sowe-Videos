import Database from "../db/Database";
import CompraService from "../service/CompraService";
import Client from "../model/Client";
import Projeto from "../model/Project";

describe("CompraService integration", () => {
  test("registrarCompra adiciona projeto e persiste no DB", () => {
    const db = new Database();
    const client = new Client("Teste", "t@ex.com", 999888777);

    db.insertNewCliente(client);

    const service = new CompraService(db);

    const projeto = new Projeto(999, "Test Project", client, null as any, 50);
    service.registrarCompra(client, projeto);

    const projetos = db.getAllProjetos();
    const found = projetos.find(p => p.getName() === "Test Project");

    expect(found).toBeDefined();
    expect(found?.getPreco()).toBe(50);
  });
});
