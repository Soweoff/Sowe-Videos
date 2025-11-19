"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(require("../db/Database"));
const CompraService_1 = __importDefault(require("../service/CompraService"));
const Client_1 = __importDefault(require("../model/Client"));
const Project_1 = __importDefault(require("../model/Project"));
describe("CompraService integration", () => {
    test("registrarCompra adiciona projeto e persiste no DB", () => {
        const db = new Database_1.default();
        const client = new Client_1.default("Teste", "t@ex.com", 999888777);
        db.insertNewCliente(client);
        const service = new CompraService_1.default(db);
        const projeto = new Project_1.default(999, "Test Project", client, null, 50);
        service.registrarCompra(client, projeto);
        const projetos = db.getAllProjetos();
        const found = projetos.find(p => p.getName() === "Test Project");
        expect(found).toBeDefined();
        expect(found?.getPreco()).toBe(50);
    });
});
