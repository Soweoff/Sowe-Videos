"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const Database_1 = __importDefault(require("./db/Database"));
const MainController_1 = __importDefault(require("./control/MainController"));
try {
    const database = new Database_1.default();
    const mainController = new MainController_1.default(database);
    // MainScreen é criado pelo MainController
}
catch (err) {
    console.error("Erro ao iniciar a aplicação:", err);
}
