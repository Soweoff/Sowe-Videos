"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = __importDefault(require("./Vehicle"));
class Moto extends Vehicle_1.default {
    _brand;
    constructor(model, year, price) {
        super(model, year, price);
    }
    get brand() {
        return this.brand;
    }
    set brand(value) {
        this.brand = value;
    }
}
exports.default = Moto;
