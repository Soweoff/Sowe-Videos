// src/index.ts
import Database from "./db/Database";
import MainController from "./control/MainController";

try {
  const database = new Database();
  const mainController = new MainController(database);
  // MainScreen é criado pelo MainController
} catch (err) {
  console.error("Erro ao iniciar a aplicação:", err);
}
