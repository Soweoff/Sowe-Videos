"use strict";
//import Database from "./db/Database";
// import Car from "./model/Car";
// import Client from "./model/Client";
// import Sale from "./service/Sale";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = __importDefault(require("./control/MainController"));
// let fusca: Car = new Car("fuscao", 1935, 34000);
// let corsa: Car = new Car("classic", 1995, 23000);
// let db: Database = new Database();
// db.insertNewCar(fusca);
// db.insertNewCar(corsa);
// let cars = db.getAllCars();
// console.log(cars);
new MainController_1.default();
// src/index.ts
