"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehicle {
    // encapsulamento
    model;
    year;
    price;
    constructor(model, year, price) {
        this.model = model;
        this.year = year;
        this.price = price;
    }
    //metodos de acesso
    getModel() {
        return this.model;
    }
    setModel(model) {
        this.model = model;
    }
    getYear() {
        return this.year;
    }
    setYear(year) {
        this.year = year;
    }
    getPrice() {
        return this.price;
    }
    setPrice(price) {
        this.price = price;
    }
}
exports.default = Vehicle;
