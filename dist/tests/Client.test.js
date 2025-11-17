"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests/Client.test.ts
const Client_1 = __importDefault(require("../model/Client"));
const Project_1 = __importDefault(require("../model/Project"));
describe("Client model", () => {
    test("cliente acumula projetos e resgata recompensa a cada 5", () => {
        const client = new Client_1.default("Teste", "t@ex.com", 123456789);
        expect(client.getProjetos_comprados()).toBe(0);
        for (let i = 0; i < 5; i++) {
            client.adicionarProjetoComprado(new Project_1.default(i + 1, `P${i + 1}`, client, null, 100));
        }
        expect(client.getProjetos_comprados()).toBe(5);
        expect(client.podeResgatarRecompensa()).toBe(true);
    });
});
