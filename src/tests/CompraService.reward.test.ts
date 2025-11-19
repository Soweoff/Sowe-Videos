import Database from "../db/Database";
import CompraService from "../service/CompraService";
import Client from "../model/Client";
import Projeto from "../model/Project";
import Editor from "../model/Editor";
import fs from "fs";
import path from "path";

const TMP_DB = path.join(__dirname, "test-data.json");

beforeEach(() => {
  if (fs.existsSync(TMP_DB)) fs.unlinkSync(TMP_DB);
});

test("deve gerar recompensa a cada 5 compras", () => {
  const db = new Database(TMP_DB); 
  const service = new CompraService(db);

  const client = new Client("Teste", "t@t.com", 12345678900);
  db.insertNewCliente(client);

  const editor = new Editor("E", "e@e", "VFX");

  for (let i = 0; i < 5; i++) {
    const projeto = new Projeto(i + 1, `P${i}`, client, editor, 50);
    service.registrarCompra(client, projeto);
  }

  const saved = db.findByCpf(12345678900)!;

  expect((saved as any).totalCompras).toBeGreaterThanOrEqual(5);
  expect((saved as any).recompensasPendentes).toBeGreaterThanOrEqual(1);
});
