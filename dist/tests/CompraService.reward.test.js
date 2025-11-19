"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const CompraService_1 = __importDefault(require("../service/CompraService"));
const Client_1 = __importDefault(require("../model/Client"));
const Project_1 = __importDefault(require("../model/Project"));
const Editor_1 = __importDefault(require("../model/Editor"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TMP_DB = path_1.default.join(__dirname, "test-data.json");
beforeEach(() => {
    if (fs_1.default.existsSync(TMP_DB))
        fs_1.default.unlinkSync(TMP_DB);
});
test("deve gerar recompensa a cada 5 compras", () => {
    const db = new Database_1.default(TMP_DB);
    const service = new CompraService_1.default(db);
    const client = new Client_1.default("Teste", "t@t.com", 12345678900);
    db.insertNewCliente(client);
    const editor = new Editor_1.default("E", "e@e", "VFX");
    for (let i = 0; i < 5; i++) {
        const projeto = new Project_1.default(i + 1, `P${i}`, client, editor, 50);
        service.registrarCompra(client, projeto);
    }
    const saved = db.findByCpf(12345678900);
    expect(saved.totalCompras).toBeGreaterThanOrEqual(5);
    expect(saved.recompensasPendentes).toBeGreaterThanOrEqual(1);
});
