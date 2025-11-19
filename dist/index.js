"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = __importDefault(require("./control/MainController"));
const MainScreen_1 = __importDefault(require("./view/MainScreen"));
const Database_1 = __importDefault(require("./db/Database"));
const db = new Database_1.default();
const controller = new MainController_1.default(db);
new MainScreen_1.default(controller);
