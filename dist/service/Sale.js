"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sale {
    doSale(car, client) {
        console.log("O carro " + car.getModel() + " foi vendido ao " + client.getName() + " por " + car.getPrice());
    }
}
exports.default = Sale;
